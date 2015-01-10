/**
 * Created by ozt on 2014-10-12.
 */

    var Circle = function (x, y, z, radius, parameters) {
        NP.Sphere.call(this, x, y, z, radius);
        this.mass = 1.23e-2;

        this.setValues(parameters);
    };
    Circle.prototype = Object.create(NP.Sphere.prototype);
    Circle.prototype.constructor = Circle;
    Circle.prototype.renderScript = function(scene) {
            var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(this.radius, 32, 32),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/moon_map_2500.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/moon_bump_4k.jpg'),
                    bumpScale: 0.05
                })
            );
            mesh.position.copy(this.position);
            this.position = mesh.position;
            scene.add(mesh);
    };
