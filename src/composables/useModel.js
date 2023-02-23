import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";
export const useModel = () => {
    let mindarThree;
    const startFunctions = async () => {
        try {
            mindarThree = new window.MINDAR.IMAGE.MindARThree({
                container: document.querySelector(".model-container"),
                overlay: false,
                imageTargetSrc:
                    "https://gateway.pinata.cloud/ipfs/QmcudRyYCbvpZ6MrnKKYe27DnUiaybhLWzCrxFe6KBdKiC ",
                uiError: "no",
                uiLoading: "no",
                uiScanning: "no",
            });

            const { renderer, camera, scene } = mindarThree;
            const firstImage = mindarThree.addAnchor(0);
            const light = new THREE.HemisphereLight(0xffffff, 0xbbffff, 1);
            scene.add(light);

            const loadingManager = new THREE.LoadingManager(
                () => {
                    console.log("loading");
                },
                () => {
                    console.log("loading");
                },
                (url) => {
                    console.log("There was an error loading " + url);
                }
            );
            const loader = new GLTFLoader(loadingManager);

            let mixer;
            loader.load("../../mafer_city/scene.gltf", (gltf) => {
                mixer = new THREE.AnimationMixer(gltf.scene);
                gltf.scene.scale.set(0.01, 0.01, 0.01);
                firstImage.group.add(gltf.scene);

                const action = mixer.clipAction(gltf.animations[0]);
                console.log(action);
                action.play();
            });

            firstImage.onTargetFound = () => {
                console.log("firstImage");
            };
            firstImage.onTargetLost = () => {
                console.log("lost");
            };

            await mindarThree.start();

            const clock = new THREE.Clock();

            renderer.setAnimationLoop(() => {
                let deltaTime = clock.getDelta();
                if (mixer) {
                    mixer.update(deltaTime);
                }
                renderer.render(scene, camera);
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    const stopFunc = () => {
        mindarThree.stop();
        window.removeEventListener("resize", () => mindarThree);
        document
            .querySelectorAll(".mindar-ui-overlay")
            .forEach((e) => e.remove());
    };

    return { startFunctions, stopFunc };
};
