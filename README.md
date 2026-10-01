# Robot_Lab

A ready-to-run catalog of **68 robot models** for [MuJoCo](https://mujoco.org) physics
simulation, bundled with a visual gallery.

The models themselves are an unmodified snapshot of
[MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie). This repo
exists to give that catalog a home, a browsable index, and the metadata needed to
run each robot offline.

## Browse the catalog

Browse the catalog at **[`catalog/`](catalog/)** — a gallery of all 68 robots with a
rendered thumbnail, leg-count badge, and a link to the model XML. GitHub renders it
inline because it is the directory's `README.md`.

Two equivalent copies exist for other contexts:

| File | Use |
| --- | --- |
| [`catalog/README.md`](catalog/README.md) | rendered by GitHub — use this on github.com |
| [`catalog/INDEX.md`](catalog/INDEX.md) | identical table for reading raw |
| [`catalog/INDEX.html`](catalog/INDEX.html) | standalone gallery for a local browser (GitHub shows HTML as source) |

The rendered images live in [`catalog/`](catalog/) alongside the model folders (83 PNGs).

## What's inside

| | |
| --- | --- |
| Robots | 68 (humanoids, quadrupeds, hexapods, arms, grippers, drones, sensors) |
| Model formats | MJCF/XML (261 files), URDF (2 files) |
| Meshes | OBJ, STL (2,428 files) |
| Gallery images | 83 PNGs |
| Total size | ~1.9 GB |

Some representative entries:

| Category | Models |
| --- | --- |
| Humanoids | `unitree_g1`, `unitree_h1`, `apptronik_apollo`, `pal_talos`, `berkeley_humanoid`, `agility_cassie`, `booster_t1`, `fourier_n1` |
| Quadrupeds | `unitree_go2`, `unitree_go1`, `unitree_a1`, `unitree_z1`, `boston_dynamics_spot`, `anybotics_anymal_b`, `anybotics_anymal_c`, `google_barkour_v0` |
| Arms | `franka_emika_panda`, `franka_fr3`, `kuka_iiwa_14`, `universal_robots_ur5e`, `universal_robots_ur10e`, `rethink_robotics_sawyer`, `kinova_gen3`, `xarm7` |
| Hands & grippers | `shadow_hand`, `wonik_allegro`, `leap_hand`, `robotiq_2f85`, `robotiq_2f85_v4`, `umi_gripper`, `dexee` |
| Drones & sensors | `skydio_x2`, `bitcraze_crazyflie_2`, `realsense_d435i`, `google_robot` |
| Other | `iit_softfoot`, `trossen_wx250s`, `trs_so_arm100`, `stanford_tidybot`, `sharpa_wave`, `aloha` |

## Running a model

Each robot folder is self-contained. Point MuJoCo at its primary XML:

```bash
# the model file is listed in the gallery, e.g. catalog/unitree_go2/go2.xml
python -c "import mujoco; m = mujoco.MjModel.from_xml_path('catalog/unitree_go2/go2.xml')"

# interactive viewer
simulate catalog/unitree_go2/go2.xml
```

In Python:

```python
import mujoco

model = mujoco.MjModel.from_xml_path("catalog/unitree_go2/go2.xml")
data = mujoco.MjData(model)
for _ in range(1000):
    mujoco.mj_step(model, data)
```

Many robots also ship a `scene.xml` next to the bare model, which adds a ground
plane, lighting, and cameras for easier viewing.

## Provenance and licensing

This catalog is a snapshot of MuJoCo Menagerie, an open-source collection of
robot models maintained by Google DeepMind. Each robot directory retains its own
`README.md`, `CHANGELOG.md`, and `LICENSE`.

**[`catalog/LICENSE`](catalog/LICENSE) is the authoritative license file** and lists
the terms for every individual robot — licenses vary per model (MIT, Apache-2.0,
BSD, and others). Read it before redistributing or building on any specific robot.

Upstream: <https://github.com/google-deepmind/mujoco_menagerie>

MuJoCo itself is Apache-2.0 licensed and is available at <https://mujoco.org>.
