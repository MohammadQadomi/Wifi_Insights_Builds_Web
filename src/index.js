import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


let container;
let camera, scene, renderer;
let controller;

let reticle;
let lastPlacedObject = null; // Variable to store the last placed object

let hitTestSource = null;
let hitTestSourceRequested = false;

// Reference to the distance display element
const distanceDiv = document.getElementById('distanceDisplay');
var cameraInitialPosition;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);
    function onSelect() {
        if (reticle.visible) {
            const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() });
            const mesh = new THREE.Mesh(geometry, material);
            reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
            mesh.scale.y = Math.random() * 2 + 1;
            scene.add(mesh);

            // Store the last placed object for distance calculation
            lastPlacedObject = mesh;

            // Calculate and display the distance between the camera and the placed object
            // updateDistance();
        }
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

	// UI Text 
	// Text material and sprite for distance and Wi-Fi signal
	const textCanvas = document.createElement('canvas');
	const context = textCanvas.getContext('2d');
	textCanvas.width = 512;
	textCanvas.height = 256;

	const textTexture = new THREE.CanvasTexture(textCanvas);
	const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
	const textSprite = new THREE.Sprite(textMaterial);
	textSprite.position.set(0, 0, -1); // Position text 1 meter in front of the camera
	textSprite.scale.set(1, 0.5, 1); // Scale it to be visible

	camera.add(textSprite); // Attach text to camera so it moves with it
	scene.add(camera);


	setInterval(updateDistance, 5000);
	cameraInitialPosition = camera.position;
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to calculate and update the distance
function updateDistance() {
    if (lastPlacedObject) {
        // const distance = camera.position.distanceTo(lastPlacedObject.position);
        const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
		console.log(`Distance: ${distance.toFixed(2)} m ----- ${cameraInitialPosition.x},${cameraInitialPosition.y},${cameraInitialPosition.z}`);
        distanceDiv.innerHTML = `Distance: ${distance.toFixed(2)} m`;

		var wifiStrength = getWifiStrength();
		if(wifiStrength !== null) updateTextOverlay(distance, wifiStrength);
    }
}

function getWifiStrength() {
    if (typeof AndroidWifi !== 'undefined') {
        const wifiStrength = AndroidWifi.getWifiSignalStrength();
        console.log(`Wi-Fi Signal Strength: ${wifiStrength}%`);
        return wifiStrength;
    } else {
        console.log('Wi-Fi signal strength access not available.');
        return null;
    }
}

function updateTextOverlay(distance, wifiStrength) {
    context.clearRect(0, 0, textCanvas.width, textCanvas.height);

    // Set font and styles
    context.font = '48px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';

    // Draw the distance and Wi-Fi strength on the canvas
    context.fillText(`Distance: ${distance.toFixed(2)} m`, textCanvas.width / 2, textCanvas.height / 2 - 20);
    context.fillText(`Wi-Fi: ${wifiStrength}%`, textCanvas.width / 2, textCanvas.height / 2 + 40);

    textTexture.needsUpdate = true; // Update texture for changes to take effect
}


function animate(timestamp, frame) {
    if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();


        if (hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then(function(referenceSpace) {
                session.requestHitTestSource({ space: referenceSpace }).then(function(source) {
                    hitTestSource = source;
                });
            });

            session.addEventListener('end', function() {
                hitTestSourceRequested = false;
                hitTestSource = null;
            });

            hitTestSourceRequested = true;
        }

        if (hitTestSource) {
            const hitTestResults = frame.getHitTestResults(hitTestSource);
            if (hitTestResults.length) {
                const hit = hitTestResults[0];
                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
            } else {
                reticle.visible = false;
            }
        }
    }
    renderer.render(scene, camera);
}
