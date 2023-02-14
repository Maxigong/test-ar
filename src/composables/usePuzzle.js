import { gsap } from "gsap";

import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export const usePuzzle = () => {
    let mindarThree;
    const startFunctions = async () => {
        try {
            mindarThree = new window.MINDAR.IMAGE.MindARThree({
                container: document.querySelector(".puzzle-container"),
                overlay: false,
                imageTargetSrc:
                    "https://gateway.pinata.cloud/ipfs/QmcudRyYCbvpZ6MrnKKYe27DnUiaybhLWzCrxFe6KBdKiC ",
                uiError: "no",
                uiLoading: "no",
                uiScanning: "no",
            });

            const { renderer, camera, cssScene, cssRenderer } = mindarThree;
            const mainContainer = new CSS3DObject(
                document.querySelector(".section")
            );

            const firstImage = mindarThree.addCSSAnchor(0);

            const secondImage = mindarThree.addCSSAnchor(1);

            let itemsFound = localStorage.getItem("itemsFound");

            if (!itemsFound) {
                itemsFound = [];
                localStorage.setItem("itemsFound", itemsFound);
            } else {
                itemsFound = JSON.parse(localStorage.getItem("itemsFound"));
            }

            const animation = () => {
                if (itemsFound.length == 0) return;
                setTimeout(() => {
                    itemsFound.forEach((el) => {
                        gsap.to(`.${el}`, {
                            opacity: 1,
                            background: "transparent",
                        });
                    });
                }, 1000);
            };
            const stopAnimation = () => {
                if (itemsFound.length == 0) return;
                itemsFound.forEach((el) => {
                    gsap.set(`.${el}`, { clearProps: "all" });
                });
            };

            firstImage.onTargetFound = () => {
                console.log("firstImage");
                firstImage.group.add(mainContainer);
                if (!itemsFound.includes("blue")) {
                    itemsFound.push("blue");
                    localStorage.setItem(
                        "itemsFound",
                        JSON.stringify(itemsFound)
                    );
                }
                animation();
            };
            firstImage.onTargetLost = () => {
                stopAnimation();
            };

            secondImage.onTargetFound = () => {
                console.log("secondImage");
                secondImage.group.add(mainContainer);
                if (!itemsFound.includes("red")) {
                    itemsFound.push("red");
                    localStorage.setItem(
                        "itemsFound",
                        JSON.stringify(itemsFound)
                    );
                }
                animation();
            };
            secondImage.onTargetLost = () => {
                stopAnimation();
            };

            await mindarThree.start();

            renderer.setAnimationLoop(() => {
                cssRenderer.render(cssScene, camera);
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
