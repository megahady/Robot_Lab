import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MuJoCoModule from 'https://cdn.jsdelivr.net/npm/@mujoco/mujoco@3.14.0/mujoco.js';

const GEOM = {
  PLANE: 0, HFIELD: 1, SPHERE: 2, CAPSULE: 3,
  ELLIPSOID: 4, CYLINDER: 5, BOX: 6, MESH: 7
};

const MUJOCO_BASE = 'https://cdn.jsdelivr.net/npm/@mujoco/mujoco@3.14.0/';
const RAW_BASE = 'https://raw.githubusercontent.com/megahady/Robot_Lab/main/';
const DEFAULT_MODEL = 'catalog/unitree_go2/scene.xml';

const el = (id) => document.getElementById(id);
const overlay = el('overlay');
const overlayText = el('overlay-text');
const msg = el('msg');

function status(text, kind) {
  msg.textContent = text || '';
  msg.className = kind || '';
}

function progress(text) {
  overlayText.textContent = text;
}

function say(text, kind) {
  status(text, kind);
}

let mujoco = null;
let model = null;
let data = null;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;
let actors = [];
let running = true;
let speed = 1;
let accumulator = 0;
let lastFrame = 0;

const PARAM = new URLSearchParams(location.search).get('model');

function dirname(p) {
  const i = p.lastIndexOf('/');
  return i < 0 ? '' : p.slice(0, i);
}

function norm(p) {
  const out = [];
  for (const part of p.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') out.pop();
    else out.push(part);
  }
  return out.join('/');
}

function joinPath(dir, sub, file) {
  const tail = sub ? sub + '/' + file : file;
  return norm(dir ? dir + '/' + tail : tail);
}

async function fetchBytes(path) {
  const res = await fetch(RAW_BASE + path);
  if (!res.ok) throw new Error('fetch ' + path + ' -> HTTP ' + res.status);
  return new Uint8Array(await res.arrayBuffer());
}

// MuJoCo applies <compiler> settings to the whole model, and scene files often declare assets
// that live under the *included* file's assetdir. So parse the full include tree first, merge
// the compiler directories, and only then resolve asset references.
function compilerDirs(doc) {
  const c = doc.querySelector('compiler');
  const get = (k) => (c && c.getAttribute(k)) || '';
  const assetdir = get('assetdir');
  return {
    mesh: get('meshdir') || assetdir,
    texture: get('texturedir') || assetdir,
  };
}

function collectRefs(doc, dir, refs) {
  for (const m of doc.querySelectorAll('mesh, skin')) {
    const f = m.getAttribute('file');
    if (f) refs.mesh.push(f);
  }
  for (const t of doc.querySelectorAll('texture')) {
    const f = t.getAttribute('file');
    if (f) refs.texture.push(f);
  }
  for (const h of doc.querySelectorAll('hfield')) {
    const f = h.getAttribute('file');
    if (f) refs.hfield.push(f);
  }
  for (const el of doc.querySelectorAll('include, model')) {
    const f = el.getAttribute('file');
    if (f) refs.link.push(f);
  }
}

function parseXml(xmlText, label) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('malformed XML in ' + label);
  return doc;
}

async function gather(modelPath) {
  const rootXml = new TextDecoder().decode(await fetchBytes(modelPath));
  const rootDir = dirname(modelPath);

  // pass 1: walk includes, collecting every XML document and the compiler dirs in play
  const xmls = [{ path: modelPath, dir: rootDir, text: rootXml }];
  const seen = new Set([modelPath]);
  const merged = { mesh: '', texture: '' };
  for (let i = 0; i < xmls.length; i++) {
    const doc = parseXml(xmls[i].text, xmls[i].path);
    const d = compilerDirs(doc);
    if (!merged.mesh && d.mesh) merged.mesh = d.mesh;
    if (!merged.texture && d.texture) merged.texture = d.texture;
    const refs = { mesh: [], texture: [], hfield: [], link: [] };
    collectRefs(doc, xmls[i].dir, refs);
    for (const f of refs.link) {
      const p = joinPath(xmls[i].dir, '', f);
      if (seen.has(p)) continue;
      seen.add(p);
      const text = new TextDecoder().decode(await fetchBytes(p));
      xmls.push({ path: p, dir: dirname(p), text });
    }
  }

  // pass 2: resolve every asset reference against the merged dirs
  const found = new Map();
  const add = (p) => { if (!found.has(p)) found.set(p, null); };
  for (const x of xmls) {
    const doc = parseXml(x.text, x.path);
    const refs = { mesh: [], texture: [], hfield: [], link: [] };
    collectRefs(doc, x.dir, refs);
    for (const f of refs.mesh) add(joinPath(x.dir, merged.mesh, f));
    for (const f of refs.texture) add(joinPath(x.dir, merged.texture, f));
    for (const f of refs.hfield) add(joinPath(x.dir, merged.texture, f));
    if (x.path !== modelPath) found.set(x.path, x.text);
  }
  return { rootXml, found };
}

async function stage(modelPath) {
  const { rootXml, found } = await gather(modelPath);

  mujoco.FS.mkdirTree('/root');
  const rootEntry = '/root/' + dirname(modelPath);
  if (rootEntry && rootEntry !== '/root') mujoco.FS.mkdirTree(rootEntry);

  const write = (p, bytes) => {
    const full = '/root/' + p;
    mujoco.FS.mkdirTree(dirname(full) || '/root');
    mujoco.FS.writeFile(full, bytes);
  };

  mujoco.FS.writeFile('/root/' + modelPath, rootXml);

  const paths = [...found.keys()];
  let done = 0;
  const batch = 12;
  for (let i = 0; i < paths.length; i += batch) {
    const slice = paths.slice(i, i + batch);
    const blobs = await Promise.all(slice.map(async (p) => {
      const cached = found.get(p);
      if (typeof cached === 'string') return new TextEncoder().encode(cached);
      try {
        return await fetchBytes(p);
      } catch (err) {
        console.warn('asset skipped:', err.message);
        return null;
      }
    }));
    slice.forEach((p, k) => {
      if (blobs[k]) write(p, blobs[k]);
    });
    done += slice.length;
    progress('loading assets ' + done + '/' + paths.length);
  }
  return paths.length;
}

function quatToMat(q) {
  const w = q[0], x = q[1], y = q[2], z = q[3];
  const n = w * w + x * x + y * y + z * z;
  if (n === 0) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const s = 2 / n;
  return [
    1 - s * (y * y + z * z), s * (x * y - w * z), s * (x * z + w * y),
    s * (x * y + w * z), 1 - s * (x * x + z * z), s * (y * z - w * x),
    s * (x * z - w * y), s * (y * z + w * x), 1 - s * (x * x + y * y)
  ];
}

function meshGeometry(m, mid) {
  const nv = m.mesh_vertnum[mid];
  const nf = m.mesh_facenum[mid];
  if (!nv || !nf) return null;

  const vstart = m.mesh_vertadr[mid] * 3;
  const verts = m.mesh_vert.slice(vstart, vstart + nv * 3);
  const fstart = m.mesh_faceadr[mid] * 3;
  const faces = m.mesh_face.slice(fstart, fstart + nf * 3);

  const sx = m.mesh_scale[mid * 3];
  const sy = m.mesh_scale[mid * 3 + 1];
  const sz = m.mesh_scale[mid * 3 + 2];
  const rot = quatToMat([
    m.mesh_quat[mid * 4], m.mesh_quat[mid * 4 + 1],
    m.mesh_quat[mid * 4 + 2], m.mesh_quat[mid * 4 + 3]
  ]);
  const px = m.mesh_pos[mid * 3];
  const py = m.mesh_pos[mid * 3 + 1];
  const pz = m.mesh_pos[mid * 3 + 2];

  const pos = new Float32Array(nv * 3);
  for (let i = 0; i < nv; i++) {
    const x = verts[i * 3] * sx, y = verts[i * 3 + 1] * sy, z = verts[i * 3 + 2] * sz;
    pos[i * 3] = rot[0] * x + rot[3] * y + rot[6] * z + px;
    pos[i * 3 + 1] = rot[1] * x + rot[4] * y + rot[7] * z + py;
    pos[i * 3 + 2] = rot[2] * x + rot[5] * y + rot[8] * z + pz;
  }

  const idx = new Uint32Array(nf * 3);
  for (let i = 0; i < nf * 3; i++) idx[i] = faces[i];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  return geo;
}

function geomGeometry(m, i) {
  const type = m.geom_type[i];
  const s0 = m.geom_size[i], s1 = m.geom_size[i + 1], s2 = m.geom_size[i + 2];

  switch (type) {
    case GEOM.PLANE: {
      const g = new THREE.PlaneGeometry(2 * Math.max(s0, 0.1), 2 * Math.max(s1, 0.1));
      g.rotateX(-Math.PI / 2);
      return g;
    }
    case GEOM.SPHERE:
      return new THREE.SphereGeometry(Math.max(s0, 1e-4), 32, 24);
    case GEOM.CAPSULE:
      return new THREE.CapsuleGeometry(Math.max(s0, 1e-4), Math.max(2 * s1, 1e-5), 8, 24);
    case GEOM.CYLINDER:
      return new THREE.CylinderGeometry(Math.max(s0, 1e-4), Math.max(s0, 1e-4), Math.max(2 * s1, 1e-5), 32);
    case GEOM.ELLIPSOID: {
      const g = new THREE.SphereGeometry(1, 32, 24);
      g.scale(Math.max(Math.abs(s0), 1e-4), Math.max(Math.abs(s1), 1e-4), Math.max(Math.abs(s2), 1e-4));
      return g;
    }
    case GEOM.BOX:
      return new THREE.BoxGeometry(2 * Math.max(Math.abs(s0), 1e-6), 2 * Math.max(Math.abs(s1), 1e-6), 2 * Math.max(Math.abs(s2), 1e-6));
    case GEOM.MESH: {
      const mid = m.geom_dataid[i];
      if (mid < 0 || mid >= m.nmesh) return null;
      return meshGeometry(m, mid);
    }
    default:
      return null;
  }
}

function modelName(m) {
  try {
    const raw = m && m.names;
    if (!raw) return 'mujoco';
    return new TextDecoder().decode(new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength)).split('\0')[0] || 'mujoco';
  } catch (err) {
    return 'mujoco';
  }
}

function buildScene(m) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1117);
  scene.fog = new THREE.Fog(0x0d1117, 8, 40);

  scene.add(new THREE.HemisphereLight(0xbcd4ff, 0x1c1c22, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(2.5, -3, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x88aaff, 0.55);
  rim.position.set(-3, 2, 1.5);
  scene.add(rim);

  const grid = new THREE.GridHelper(20, 40, 0x30363d, 0x1c2128);
  grid.material.opacity = 0.55;
  grid.material.transparent = true;
  scene.add(grid);

  const dummy = new THREE.Matrix4();
  const color = new THREE.Color();

  actors = [];
  for (let i = 0; i < m.ngeom; i++) {
    if (m.geom_type[i] === GEOM.HFIELD) continue;
    const geo = geomGeometry(m, i);
    if (!geo) continue;

    const r = m.geom_rgba[i * 4];
    const g = m.geom_rgba[i * 4 + 1];
    const b = m.geom_rgba[i * 4 + 2];
    const a = m.geom_rgba[i * 4 + 3];
    color.setRGB(r, g, b).convertSRGBToLinear();

    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.62,
      metalness: 0.06,
      side: THREE.DoubleSide,
      transparent: a < 0.999,
      opacity: a
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    actors.push({ mesh, gid: i, dummy });
  }
}

function frameCamera(m) {
  const ext = m.stat.extent;
  const c = m.stat.center;
  const target = new THREE.Vector3(c[0], c[1], c[2]);
  const dist = Math.max(ext * 2.6, 1.2);
  camera.position.set(target.x + dist * 0.8, target.y - dist, target.z + dist * 0.5);
  controls.target.copy(target);
  controls.update();
}

function updateActors() {
  for (const a of actors) {
    const g = a.gid;
    const p = data.geom_xpos;
    const q = data.geom_xmat;
    a.mesh.position.set(p[g * 3], p[g * 3 + 1], p[g * 3 + 2]);
    a.mesh.setRotationFromMatrix(
      a.dummy.set(
        q[g * 9], q[g * 9 + 1], q[g * 9 + 2], 0,
        q[g * 9 + 3], q[g * 9 + 4], q[g * 9 + 5], 0,
        q[g * 9 + 6], q[g * 9 + 7], q[g * 9 + 8], 0,
        p[g * 3], p[g * 3 + 1], p[g * 3 + 2], 1
      )
    );
  }
}

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min((now - lastFrame) / 1000, 0.1);
  lastFrame = now;

  if (running && model) {
    accumulator += dt * speed;
    const step = model.opt.timestep;
    let guard = 0;
    while (accumulator >= step && guard < 500) {
      mujoco.mj_step(model, data);
      accumulator -= step;
      guard++;
    }
    if (guard >= 500) accumulator = 0;
    updateActors();
    el('stat-time').textContent = data.time.toFixed(2);
  }

  controls.update();
  renderer.render(scene, camera);
}

async function loadModel(modelPath) {
  overlay.classList.remove('hidden');
  progress('compiling ' + modelPath);
  say('');

  try {
    if (model) {
      if (typeof model.delete === 'function') model.delete();
      if (data && typeof data.delete === 'function') data.delete();
      model = null;
      data = null;
    }
    const assetCount = await stage(modelPath);
    progress('compiling…');
    model = mujoco.MjModel.from_xml_path('/root/' + modelPath);
    data = new mujoco.MjData(model);
    mujoco.mj_forward(model, data);

    buildScene(model);
    frameCamera(model);
    updateActors();

    el('stat-geoms').textContent = model.ngeom;
    el('stat-joints').textContent = model.njnt;
    el('stat-actuators').textContent = model.nu;
    el('stat-time').textContent = '0.00';

    const url = new URL(location.href);
    url.searchParams.set('model', modelPath);
    history.replaceState(null, '', url);

    say('loaded ' + modelPath + ' · ' + assetCount + ' assets', 'ok');
    overlay.classList.add('hidden');
  } catch (err) {
    console.error(err);
    overlay.classList.add('hidden');
    say(String(err && err.message ? err.message : err), 'err');
  }
}

async function populateModels() {
  const select = el('model-select');
  try {
    const res = await fetch('models.json');
    const list = await res.json();
    let group = null;
    for (const m of list) {
      if (m.category && m.category !== group) {
        group = m.category;
        const og = document.createElement('optgroup');
        og.label = group;
        select.appendChild(og);
      }
      const opt = document.createElement('option');
      opt.value = m.xml;
      opt.textContent = m.dofs ? m.name + ' · ' + m.dofs + ' DoF' : m.name;
      select.appendChild(opt);
    }
    select.value = PARAM || DEFAULT_MODEL;
    if (![...select.options].some((o) => o.value === select.value)) select.value = DEFAULT_MODEL;
    select.addEventListener('change', () => loadModel(select.value));
  } catch (err) {
    const opt = document.createElement('option');
    opt.value = DEFAULT_MODEL;
    opt.textContent = 'Unitree Go2';
    select.appendChild(opt);
    select.addEventListener('change', () => loadModel(select.value));
  }
}

function initThree() {
  const stageEl = el('stage');
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(stageEl.clientWidth, stageEl.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stageEl.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, stageEl.clientWidth / stageEl.clientHeight, 0.01, 200);
  camera.position.set(2, -2.5, 1.6);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  addEventListener('resize', () => {
    const w = stageEl.clientWidth, h = stageEl.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

function wireControls() {
  el('play').addEventListener('click', () => {
    running = !running;
    el('play').textContent = running ? 'Pause' : 'Play';
  });
  el('step').addEventListener('click', () => {
    if (!model) return;
    mujoco.mj_step(model, data);
    updateActors();
  });
  el('reset').addEventListener('click', () => {
    if (!model) return;
    mujoco.mj_resetData(model, data);
    mujoco.mj_forward(model, data);
    updateActors();
  });
  el('speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    el('speed-val').textContent = speed.toFixed(2) + 'x';
  });
  el('screenshot').addEventListener('click', () => {
    renderer.render(scene, camera);
    const a = document.createElement('a');
    a.download = modelName(model) + '.png';
    a.href = renderer.domElement.toDataURL('image/png');
    a.click();
  });
}

async function main() {
  progress('starting engine…');
  mujoco = await MuJoCoModule({ locateFile: (f) => MUJOCO_BASE + f });

  initThree();
  wireControls();
  await populateModels();

  lastFrame = performance.now();
  requestAnimationFrame(loop);

  const target = PARAM || el('model-select').value || DEFAULT_MODEL;
  await loadModel(target);
}

main().catch((err) => {
  console.error(err);
  overlay.classList.add('hidden');
  say(String(err && err.message ? err.message : err), 'err');
});
