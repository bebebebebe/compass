$(document).ready(function() {

  var PURPLE = 0x936693;
  var MOUNTAIN_CENTER = new THREE.Vector3(0,0,-30);

  var camera, scene, renderer;

  init();
  wire();

  function init() {
    var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    };

    camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 10000);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(size.width, size.height);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 0;
    camera.lookAt(MOUNTAIN_CENTER);

    addCube(PURPLE, MOUNTAIN_CENTER);
    light();
    render();
  }

  function wire() {
    window.addEventListener('deviceorientation', orientationH, true);
  }

  function addCube(color, vector) {
    var geometry = new THREE.CubeGeometry(15,2,2);
    var material = new THREE.MeshLambertMaterial({color: color});
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = vector.x;
    cube.position.y = vector.y;
    cube.position.z = vector.z;

    scene.add(cube);
  }

  function light() {
    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);
  }

  function cameraDirUpd(coords) {
    console.log(coords);
    var vector = new THREE.Vector3(- coords.east, 0, - coords.north);

    camera.lookAt(vector);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function orientationH(e) {
    if (typeof e.alpha === 'undefined' || e.alpha === null) return;

    var deg = e.alpha; // degrees West
    cameraDirUpd(coordsDir(deg));
  }

  function coordsDir(deg) {
    var north = (deg === 90 || deg === 270) ? 0 : Math.cos(radians(deg));
    var east = (deg == 180 || deg === 360) ? 0 : Math.sin(radians(deg));

    return {north: north, east: east};
  }

  function radians(deg) {
    return deg * Math.PI / 180;
  }

  window.camera = camera;
  window.render = render;

});
