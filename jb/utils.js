export const glassMat = new THREE.MeshPhysicalMaterial({
    /*color: new THREE.Color(0xDDB13), // pinkish jelly color
    transparent: true,
    opacity: 0.6,                  // soft transparency
    transmission: 0.1,             // glass-like transmission
    roughness: 0.1,                // smooth surface
    metalness: 0,                   // non-metallic
    clearcoat: 1.0,                 // adds extra shine
    clearcoatRoughness: 0.05,       // smooth glossy finish
    reflectivity: 0.5,             // reflections
    ior: 1.33,                      // index of refraction (like jelly / water)
    specularIntensity: 1.0,*/
    color: 0xffffff,
    transmission: 1.0,
    opacity: 1.0,
    metalness: .3,
    roughness: 0.0,
    ior: 1.5,
    thickness: .3,
    attenuationColor: 0xffffff,
    attenuationDistance: 1.5,
    specularIntensity: 0.06,
    specularColor: 0xffffff,
    lightIntensity: .2,
    exposure: .1,
    transparent: false,
});

// Fresnel effect using onBeforeCompile for subtle edge glow
glassMat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `
        				#include <dithering_fragment>

       					 // Fresnel edge glow
						float fresnel = pow(dot(normalize(vViewPosition), normal), 0.7);
        				vec3 fresnelColor = vec3(1.0, 1.0, 1.0) * fresnel * 3.2; // subtle white edges
						gl_FragColor.rgb *= fresnelColor;
        				`
    );
};
glassMat.side = THREE.FrontSide;
