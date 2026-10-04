# Awesome MuJoCo Robots [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated catalog of **70 ready-to-run robots** for [MuJoCo](https://mujoco.org), vendored from [MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie) and re-hosted with an in-browser viewer.

Each directory in [`catalog/`](.) is self-contained: meshes in `assets/`, the scene file, plus its own `README.md` and `LICENSE`. Category, display name, DoF count and license track upstream.

## Contents

* [Humanoids](#humanoids) — 11
* [Quadrupeds](#quadrupeds) — 8
* [Bipeds](#bipeds) — 1
* [Biomechanical](#biomechanical) — 3
* [Dual Arms](#dual-arms) — 1
* [Mobile Manipulators](#mobile-manipulators) — 7
* [Drones](#drones) — 2
* [Arms](#arms) — 24
* [End-effectors](#end-effectors) — 11
* [Mobile Bases](#mobile-bases) — 1
* [Miscellaneous](#miscellaneous) — 1
* [Adding a Robot](#adding-a-robot)
* [License](#license)

## Models

> Click any thumbnail below to open the model in an in-browser MuJoCo viewer powered by [megahady.github.io/Robot_Lab](https://megahady.github.io/Robot_Lab/).

<!-- BEGIN MODELS (auto-generated — do not edit) -->

**Humanoids.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_h1/scene.xml' title='Open live preview for Unitree H1'><img src='assets/unitree_h1-h1.png' width=120></a> | Unitree H1 | 19 | [BSD-3-Clause](unitree_h1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/robotis_op3/scene.xml' title='Open live preview for Robotis OP3'><img src='assets/robotis_op3-op3.png' width=120></a> | Robotis OP3 | 20 | [Apache-2.0](robotis_op3/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_g1/scene.xml' title='Open live preview for Unitree G1'><img src='assets/unitree_g1-g1.png' width=120></a> | Unitree G1 | 29 | [BSD-3-Clause](unitree_g1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/pal_talos/scene_position.xml' title='Open live preview for TALOS'><img src='assets/pal_talos-talos.png' width=120></a> | TALOS | 44 | [Apache-2.0](pal_talos/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/booster_t1/scene.xml' title='Open live preview for Booster T1'><img src='assets/booster_t1-t1.png' width=120></a> | Booster T1 | 23 | [Apache-2.0](booster_t1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/toddlerbot_2xc/scene.xml' title='Open live preview for ToddlerBot 2XC'><img src='assets/toddlerbot_2xc-toddlerbot_2xc.png' width=120></a> | ToddlerBot 2XC | 44 | [MIT](toddlerbot_2xc/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/pndbotics_adam_lite/scene.xml' title='Open live preview for PNDbotics Adam_lite'><img src='assets/pndbotics_adam_lite-adam_lite.png' width=120></a> | PNDbotics Adam_lite | 25 | [MIT](pndbotics_adam_lite/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/apptronik_apollo/scene.xml' title='Open live preview for Apptronik Apollo'><img src='assets/apptronik_apollo-apptronik_apollo.png' width=120></a> | Apptronik Apollo | 32 | [Apache-2.0](apptronik_apollo/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/berkeley_humanoid/scene.xml' title='Open live preview for Berkeley Humanoid'><img src='assets/berkeley_humanoid-berkeley_humanoid.png' width=120></a> | Berkeley Humanoid | 12 | [BSD-3-Clause](berkeley_humanoid/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/fourier_n1/scene.xml' title='Open live preview for Fourier N1'><img src='assets/fourier_n1-n1.png' width=120></a> | Fourier N1 | 23 | [Apache-2.0](fourier_n1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/toddlerbot_2xm/scene.xml' title='Open live preview for ToddlerBot 2XM'><img src='assets/toddlerbot_2xm-toddlerbot_2xm.png' width=120></a> | ToddlerBot 2XM | 44 | [MIT](toddlerbot_2xm/LICENSE) |

**Quadrupeds.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_a1/scene.xml' title='Open live preview for Unitree A1'><img src='assets/unitree_a1-a1.png' width=120></a> | Unitree A1 | 12 | [BSD-3-Clause](unitree_a1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/google_barkour_v0/scene.xml' title='Open live preview for Google Barkour v0'><img src='assets/google_barkour_v0-barkour_v0.png' width=120></a> | Google Barkour v0 | 12 | [Apache-2.0](google_barkour_v0/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/anybotics_anymal_b/scene.xml' title='Open live preview for ANYmal B'><img src='assets/anybotics_anymal_b-anymal_b.png' width=120></a> | ANYmal B | 12 | [BSD-3-Clause](anybotics_anymal_b/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_go1/scene.xml' title='Open live preview for Unitree Go1'><img src='assets/unitree_go1-go1.png' width=120></a> | Unitree Go1 | 12 | [BSD-3-Clause](unitree_go1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/anybotics_anymal_c/scene.xml' title='Open live preview for ANYmal C'><img src='assets/anybotics_anymal_c-anymal_c.png' width=120></a> | ANYmal C | 12 | [BSD-3-Clause](anybotics_anymal_c/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/google_barkour_vb/scene.xml' title='Open live preview for Google Barkour vB'><img src='assets/google_barkour_vb-barkour_vb.png' width=120></a> | Google Barkour vB | 12 | [Apache-2.0](google_barkour_vb/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_go2/scene.xml' title='Open live preview for Unitree Go2'><img src='assets/unitree_go2-go2.png' width=120></a> | Unitree Go2 | 12 | [BSD-3-Clause](unitree_go2/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/boston_dynamics_spot/scene.xml' title='Open live preview for Boston Dynamics Spot'><img src='assets/boston_dynamics_spot-spot.png' width=120></a> | Boston Dynamics Spot | 19 | [BSD-3-Clause](boston_dynamics_spot/LICENSE) |

**Bipeds.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/agility_cassie/scene.xml' title='Open live preview for Agility Cassie'><img src='assets/agility_cassie-cassie.png' width=120></a> | Agility Cassie | 28 | [MIT](agility_cassie/LICENSE) |

**Biomechanical.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/flybody/scene.xml' title='Open live preview for Flybody'><img src='assets/flybody-flybody.png' width=120></a> | Flybody | 102 | [Apache-2.0](flybody/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/iit_softfoot/scene.xml' title='Open live preview for IIT SoftFoot'><img src='assets/iit_softfoot-softfoot.png' width=120></a> | IIT SoftFoot | 92 | [BSD-3-Clause](iit_softfoot/LICENSE) |
| <img src='assets/ms_human_700-ms_human_700.png' width=120 title='Not available in the browser viewer'> | MS-Human-700 | 85 | [Apache-2.0](ms_human_700/LICENSE) |

**Dual Arms.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/aloha/scene.xml' title='Open live preview for ALOHA'><img src='assets/aloha-aloha.png' width=120></a> | ALOHA | 16 | [BSD-3-Clause](aloha/LICENSE) |

**Mobile Manipulators.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/google_robot/scene.xml' title='Open live preview for Google Robot'><img src='assets/google_robot-robot.png' width=120></a> | Google Robot | 9 | [Apache-2.0](google_robot/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/hello_robot_stretch/scene.xml' title='Open live preview for Hello Robot Stretch 2'><img src='assets/hello_robot_stretch-stretch.png' width=120></a> | Hello Robot Stretch 2 | 17 | [BSD-3-Clause-Clear](hello_robot_stretch/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/stanford_tidybot/scene.xml' title='Open live preview for Stanford TidyBot'><img src='assets/stanford_tidybot-tidybot.png' width=120></a> | Stanford TidyBot | 18 | [MIT](stanford_tidybot/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/hello_robot_stretch_3/scene.xml' title='Open live preview for Hello Robot Stretch 3'><img src='assets/hello_robot_stretch_3-stretch.png' width=120></a> | Hello Robot Stretch 3 | 20 | [Apache-2.0](hello_robot_stretch_3/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/pal_tiago/scene_position.xml' title='Open live preview for TIAGo'><img src='assets/pal_tiago-tiago.png' width=120></a> | TIAGo | 22 | [Apache-2.0](pal_tiago/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/pal_tiago_dual/scene_position.xml' title='Open live preview for TIAGo++'><img src='assets/pal_tiago_dual-tiago_dual.png' width=120></a> | TIAGo++ | 25 | [Apache-2.0](pal_tiago_dual/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/rainbow_robotics_rby1/scene_rby1a_1.2.xml' title='Open live preview for Rainbow Robotics RBY1'><img src='assets/rainbow_robotics_rby1-mujoco_RBY1.png' width=120></a> | Rainbow Robotics RBY1 | 28 | [Apache-2.0](rainbow_robotics_rby1/LICENSE) |

**Drones.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/skydio_x2/scene.xml' title='Open live preview for Skydio X2'><img src='assets/skydio_x2-x2.png' width=120></a> | Skydio X2 | 0 | [Apache-2.0](skydio_x2/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/bitcraze_crazyflie_2/scene.xml' title='Open live preview for Bitcraze Crazyflie 2'><img src='assets/bitcraze_crazyflie_2-cf2.png' width=120></a> | Bitcraze Crazyflie 2 | 0 | [MIT](bitcraze_crazyflie_2/LICENSE) |

**Arms.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/franka_emika_panda/scene.xml' title='Open live preview for Franka Emika Panda'><img src='assets/franka_emika_panda-panda.png' width=120></a> | Franka Emika Panda | 9 | [Apache-2.0](franka_emika_panda/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/franka_fr3/scene.xml' title='Open live preview for Franka Robotics FR3'><img src='assets/franka_fr3-fr3.png' width=120></a> | Franka Robotics FR3 | 7 | [Apache-2.0](franka_fr3/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/ufactory_lite6/scene.xml' title='Open live preview for Lite 6'><img src='assets/ufactory_lite6-lite6.png' width=120></a> | Lite 6 | 6 | [BSD-3-Clause](ufactory_lite6/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/unitree_z1/scene.xml' title='Open live preview for Unitree Z1'><img src='assets/unitree_z1-z1.png' width=120></a> | Unitree Z1 | 6 | [BSD-3-Clause](unitree_z1/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/universal_robots_ur5e/scene.xml' title='Open live preview for Universal Robots UR5e'><img src='assets/universal_robots_ur5e-ur5e.png' width=120></a> | Universal Robots UR5e | 6 | [BSD-3-Clause](universal_robots_ur5e/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/rethink_robotics_sawyer/scene.xml' title='Open live preview for Rethink Robotics Sawyer'><img src='assets/rethink_robotics_sawyer-sawyer.png' width=120></a> | Rethink Robotics Sawyer | 7 | [Apache-2.0](rethink_robotics_sawyer/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/universal_robots_ur10e/scene.xml' title='Open live preview for Universal Robots UR10e'><img src='assets/universal_robots_ur10e-ur10e.png' width=120></a> | Universal Robots UR10e | 6 | [BSD-3-Clause](universal_robots_ur10e/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/kuka_iiwa_14/scene.xml' title='Open live preview for KUKA LBR iiwa 14'><img src='assets/kuka_iiwa_14-iiwa_14.png' width=120></a> | KUKA LBR iiwa 14 | 7 | [BSD-3-Clause](kuka_iiwa_14/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/trossen_vx300s/scene.xml' title='Open live preview for ViperX 300 6DOF'><img src='assets/trossen_vx300s-vx300s.png' width=120></a> | ViperX 300 6DOF | 8 | [BSD-3-Clause](trossen_vx300s/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/ufactory_xarm7/scene.xml' title='Open live preview for xArm7'><img src='assets/ufactory_xarm7-xarm7.png' width=120></a> | xArm7 | 13 | [BSD-3-Clause](ufactory_xarm7/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/kinova_gen3/scene.xml' title='Open live preview for Kinova Gen3'><img src='assets/kinova_gen3-gen3.png' width=120></a> | Kinova Gen3 | 7 | [BSD-3-Clause](kinova_gen3/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/agilex_piper/scene.xml' title='Open live preview for AgileX PiPER'><img src='assets/agilex_piper-piper.png' width=120></a> | AgileX PiPER | 8 | [MIT](agilex_piper/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/flexiv_rizon4/scene.xml' title='Open live preview for Flexiv Robotics Rizon4'><img src='assets/flexiv_rizon4-flexiv_rizon4.png' width=120></a> | Flexiv Robotics Rizon4 | 7 | [Apache-2.0](flexiv_rizon4/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/arx_l5/scene.xml' title='Open live preview for ARX L5'><img src='assets/arx_l5-arx_l5.png' width=120></a> | ARX L5 | 8 | [BSD-3-Clause](arx_l5/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/flexiv_rizon4s/scene.xml' title='Open live preview for Flexiv Robotics Rizon4S'><img src='assets/flexiv_rizon4s-flexiv_rizon4s.png' width=120></a> | Flexiv Robotics Rizon4S | 7 | [Apache-2.0](flexiv_rizon4s/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/trossen_wx250s/scene.xml' title='Open live preview for WidowX 250 6DOF'><img src='assets/trossen_wx250s-wx250s.png' width=120></a> | WidowX 250 6DOF | 8 | [BSD-3-Clause](trossen_wx250s/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/trs_so_arm100/scene.xml' title='Open live preview for Standard Open Arm-100 5DOF - Version 1.3'><img src='assets/trs_so_arm100-so_arm100.png' width=120></a> | Standard Open Arm-100 5DOF - Version 1.3 | 6 | [Apache-2.0](trs_so_arm100/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/low_cost_robot_arm/scene.xml' title='Open live preview for Low-Cost Robot Arm'><img src='assets/low_cost_robot_arm-low_cost_robot_arm.png' width=120></a> | Low-Cost Robot Arm | 6 | [Apache-2.0](low_cost_robot_arm/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/i2rt_yam/scene.xml' title='Open live preview for Yet Another Manipulator (YAM)'><img src='assets/i2rt_yam-yam.png' width=120></a> | Yet Another Manipulator (YAM) | 8 | [MIT](i2rt_yam/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/seeed_rebot_devarm/scene.xml' title='Open live preview for Seeed Studio reBot DevArm'><img src='assets/seeed_rebot_devarm-seeed_rebot_devarm.png' width=120></a> | Seeed Studio reBot DevArm | 8 | [MIT](seeed_rebot_devarm/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/dynamixel_2r/scene.xml' title='Open live preview for Dynamixel 2R'><img src='assets/dynamixel_2r-dynamixel_2r.png' width=120></a> | Dynamixel 2R | 2 | [MIT](dynamixel_2r/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/franka_fr3_v2/scene.xml' title='Open live preview for Franka Robotics FR3 v2'><img src='assets/franka_fr3_v2-fr3v2.png' width=120></a> | Franka Robotics FR3 v2 | 7 | [Apache-2.0](franka_fr3_v2/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/robotstudio_so101/scene.xml' title='Open live preview for The Robot Studio SO101'><img src='assets/robotstudio_so101-so101.png' width=120></a> | The Robot Studio SO101 | 6 | [Apache-2.0](robotstudio_so101/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/trossen_wxai/scene.xml' title='Open live preview for Trossen WXAI'><img src='assets/trossen_wxai-trossen_wxai.png' width=120></a> | Trossen WXAI | 8 | [BSD-3-Clause](trossen_wxai/LICENSE) |

**End-effectors.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/franka_emika_panda/hand.xml' title='Open live preview for Panda Gripper'><img src='assets/franka_emika_panda-panda.png' width=120></a> | Panda Gripper | 2 | [Apache-2.0](franka_emika_panda/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/wonik_allegro/scene_left.xml' title='Open live preview for Allegro Hand V3'><img src='assets/wonik_allegro-allegro_hand.png' width=120></a> | Allegro Hand V3 | 16 | [BSD-2-Clause](wonik_allegro/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/shadow_hand/scene_left.xml' title='Open live preview for Shadow Hand E3M5'><img src='assets/shadow_hand-shadow_hand.png' width=120></a> | Shadow Hand E3M5 | 24 | [Apache-2.0](shadow_hand/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/robotiq_2f85/scene.xml' title='Open live preview for Robotiq 2F-85'><img src='assets/robotiq_2f85-2f85.png' width=120></a> | Robotiq 2F-85 | 8 | [BSD-2-Clause](robotiq_2f85/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/ufactory_xarm7/hand.xml' title='Open live preview for xarm7 Gripper'><img src='assets/ufactory_xarm7-xarm7.png' width=120></a> | xarm7 Gripper | 6 | [BSD-3-Clause](ufactory_xarm7/LICENSE) |
| <img src='assets/shadow_dexee-shadow_dexee.png' width=120 title='Not available in the browser viewer'> | Shadow DEX-EE Hand | 12 | [Apache-2.0](shadow_dexee/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/leap_hand/scene_left.xml' title='Open live preview for Leap Hand'><img src='assets/leap_hand-right_hand.png' width=120></a> | Leap Hand | 16 | [MIT](leap_hand/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/umi_gripper/scene.xml' title='Open live preview for UMI-Gripper'><img src='assets/umi_gripper-umi_gripper.png' width=120></a> | UMI-Gripper | 8 | [MIT](umi_gripper/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/sharpa_wave/scene_left.xml' title='Open live preview for Sharpa Wave'><img src='assets/sharpa_wave-sharpa_wave.png' width=120></a> | Sharpa Wave | 22 | [Apache-2.0](sharpa_wave/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/robotiq_2f85_v4/scene.xml' title='Open live preview for Robotiq 2F-85 v4'><img src='assets/robotiq_2f85_v4-2f85.png' width=120></a> | Robotiq 2F-85 v4 | 6 | [BSD-2-Clause](robotiq_2f85_v4/LICENSE) |
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/tetheria_aero_hand_open/scene_right.xml' title='Open live preview for Tetheria Aero Hand Open'><img src='assets/tetheria_aero_hand_open-aero_hand_open.png' width=120></a> | Tetheria Aero Hand Open | 16 | [Apache-2.0](tetheria_aero_hand_open/LICENSE) |

**Mobile Bases.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/robot_soccer_kit/scene.xml' title='Open live preview for Robot soccer kit omnidirectional'><img src='assets/robot_soccer_kit-robot_soccer_kit.png' width=120></a> | Robot soccer kit omnidirectional | 64 | [MIT](robot_soccer_kit/LICENSE) |

**Miscellaneous.**

| Preview | Name | DoFs | License |
|:---:|---|---|---|
| <a href='https://megahady.github.io/Robot_Lab/?model=catalog/realsense_d435i/d435i.xml' title='Open live preview for Realsense D435i'><img src='assets/realsense_d435i-d435i.png' width=120></a> | Realsense D435i | 0 | [Apache-2.0](realsense_d435i/LICENSE) |

<!-- END MODELS -->

### Not available in the browser viewer

Two models cannot be compiled by the stock `@mujoco/mujoco` 3.14.0 WASM build. They run fine from the Python bindings, where the plugin and heap are available:

* **MS-Human-700** — exceeds the WASM heap; needs a build with `-sIMPORTED_MEMORY`
* **Shadow DEX-EE Hand** — requires the compiled `mujoco.pid` plugin, absent from the stock build

## Adding a Robot

Drop a Menagerie-style folder into `catalog/` with `assets/`, a scene XML, `README.md` and `LICENSE`, then regenerate this page. The viewer loads a **scene** file (`scene*.xml`) so the robot arrives with its floor, lighting and skybox; `<include>` and `compiler` `meshdir`/`texturedir` are resolved recursively when staging assets.

## License

These are third-party models. Each robot keeps upstream terms in its own `LICENSE`; [`LICENSE`](LICENSE) aggregates them (MIT, Apache-2.0, BSD-3-Clause and others). Read the per-robot file before redistributing or building on a specific model. Upstream: <https://github.com/google-deepmind/mujoco_menagerie>
