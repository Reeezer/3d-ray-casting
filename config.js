"use strict";

class Configuration {
	constructor(lights, lightsColor, lightsIntensity, walls) {
		this.lights = lights; // x, y (0 -1)
		this.lightsColor = lightsColor; // r, g, b (0 - 1)
		this.lightsIntensity = lightsIntensity; // intensité (0 - ∞)
		this.walls = walls; // x1, y1, x2, y2 (0 - 1)
	}

	static scenario1() {
		let lights = [
			// Up
			0.1, 0.45, 
			0.2, 0.45, 
			0.3, 0.45, 
			0.4, 0.45, 
			0.5, 0.45,
			0.6, 0.45,
			0.7, 0.45, 
			0.8, 0.45, 
			0.9, 0.45,

			// Down
			0.1, 0.55, 
			0.2, 0.55, 
			0.3, 0.55, 
			0.4, 0.55, 
			0.5, 0.55, 
			0.6, 0.55,
			0.7, 0.55, 
			0.8, 0.55, 
			0.9, 0.55,
		];

		let lightsColor = [
			// Up
			1, 0, 0, 
			0, 1, 0, 
			0, 0, 1, 
			1, 1, 0, 
			1, 0, 0, 
			0, 1, 0, 
			0, 0, 1, 
			1, 1, 0, 
			1, 0, 0,

			// Down
			0, 0, 1,
			1, 1, 0,
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			1, 1, 0,
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		];

		let lightsIntensity = [
			// Up
			1, 1, 1, 
			1, 1, 1, 
			1, 1, 1,

			// Down
			1, 1, 1,
			1, 1, 1, 
			1, 1, 1,
		];

		// https://media.discordapp.net/attachments/512904111709224972/834793966871379968/unknown.png
		let walls = [
			// Up
			0.0, 0.4, 0.55, 0.4, 
			0.55, 0.4, 0.55, 0.35,
			0.55, 0.35, 0.4, 0.35,
			0.4, 0.35, 0.4, 0.05, 
			0.4, 0.05, 0.85, 0.05, 
			0.85, 0.05, 0.85, 0.35,
			0.85, 0.35, 0.7, 0.35, 
			0.7, 0.35, 0.7, 0.4, 
			0.7, 0.4, 1.0, 0.4,

			// Down
			0.0, 0.6, 0.3, 0.6, 
			0.3, 0.6, 0.3, 0.65, 
			0.3, 0.65, 0.1, 0.65, 
			0.1, 0.65, 0.1, 0.9, 
			0.1, 0.9, 0.7, 0.9, 
			0.7, 0.9, 0.7, 0.65, 
			0.7, 0.65, 0.5, 0.65, 
			0.5, 0.65, 0.5, 0.6, 
			0.5, 0.6, 1.0, 0.6,
		];

		return new Configuration(lights, lightsColor, lightsIntensity, walls);
	}

	static scenario2() {
		let lights = [
			0.25, 0.25,
			0.25, 0.75,
			0.75, 0.25,
			0.75, 0.75];

		let lightsColor = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			1, 1, 0];

		let lightsIntensity = [
			1,
			1,
			1,
			1];

		let walls = [
			0.1, 0.4, 0.7, 0.8,
			0.3, 0.5, 0.4, 0.6,
			0.1, 0.4, 0.3, 0.4,
			0.1, 0.4, 0.1, 0.7,
			0.1, 0.1, 0.7, 0.1,
			0.7, 0.4, 0.7, 0.7,
			0.5, 0.4, 0.7, 0.4,
			0.5, 0.5, 0.5, 0.6,
			0.5, 0.5, 1.0, 0.5,
			0.0, 0.6, 0.7, 0.6,
			0.7, 0.7, 0.7, 0.8,
			0.4, 0.7, 0.7, 0.7,
			0.4, 0.9, 0.4, 1.0,
			0.4, 0.9, 0.9, 0.9,
			0.9, 0.9, 0.9, 1.0,
			0.8, 0.7, 0.9, 0.7,
			0.8, 0.7, 0.8, 0.8,
			0.8, 0.6, 0.9, 0.6,
		];

		return new Configuration(lights, lightsColor, lightsIntensity, walls);
	}

	static scenario3() {
		let lights = [0.05, 0.05, 0.05, 0.95, 0.95, 0.95, 0.95, 0.05];

		let lightsColor = [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0];

		let lightsIntensity = [1.0, 1.0, 1.0, 1.0];

		let walls = [
			0.0, 0.0, 0.9, 0.9
		];

		return new Configuration(lights, lightsColor, lightsIntensity, walls);
	}

	static scenario5() {
		let lights = [
			// Positions x, y
			0.5, 0.3, 
			0.2, 0.75, 
			0.7, 0.25, 
			0.8, 0.75, 
			0.6, 0.5,
		];

		let lightsColor = [
			// Color is float r float b float g
			1, 0, 0, //red
			0, 1, 0, //green
			0, 0, 1, //blue
			1, 1, 0, //yellow
			0.75, 0.25, 0.75, //violet
		];

		let lightsIntensity = [
			// Intensity float
			1, 1, 1, 1, 1,
		];

		let walls = [
			// Walls x1, y1, x2, y2
			0.1, 0.1, 0.9, 0.1,
			0.1, 0.5, 0.1, 0.9,
			0.5, 0.5, 0.9, 0.9,
			0.3, 0.6, 0.5, 0.9,
		];

		return new Configuration(lights, lightsColor, lightsIntensity, walls);
	}

	// Parse svg to wall array
	static svgElementToWalls(svgWalls) {
		let x0 = parseInt(svgWalls.getAttribute("x"));
		let y0 = parseInt(svgWalls.getAttribute("y"));
		let x100 = parseInt(svgWalls.getAttribute("width")) - x0;
		let y100 = parseInt(svgWalls.getAttribute("height")) - y0;

		const calibrateX = (x) => {
			return (this.clamp(x0, x100, x) - x0) / x100;
		};

		const calibrateY = (y) => {
			return (this.clamp(y0, y100, y) - y0) / y100;
		};

		let lines = svgWalls.children;
		let walls = [];

		for (const line of lines) {
			let x1 = parseInt(line.getAttribute("x1"));
			let y1 = parseInt(line.getAttribute("y1"));
			let x2 = parseInt(line.getAttribute("x2"));
			let y2 = parseInt(line.getAttribute("y2"));

			walls.push(calibrateX(x1));
			walls.push(calibrateY(y1));
			walls.push(calibrateX(x2));
			walls.push(calibrateY(y2));
		}

		return walls;
	}

	static clamp(min, max, val) {
		return Math.min(Math.max(min, val), max);
	}
}

function makeWalls(walls2D) {
	let height = 0.1;
	let walls3D = [];
    //Assert walls2D.length % 4 == 0
	
	// DO NOT USE TRIANGLESTRIP, USE TRIANGLES
	for (let i = 0; i < walls2D.length / 4; i++) {
		let currIndex = i * 4;
		let A1x = walls2D[currIndex];
		let A1y = walls2D[currIndex+1];
		let B1x = walls2D[currIndex+2];
		let B1y = walls2D[currIndex+3];

		// now (0, 0) is bottom left
		// invert the y-axis
		// 1 because the max size is 1, don't change it plz
		A1y = 1-A1y
		B1y = 1-B1y        

		// before (0, 0) was top left, now it is center
		// => we need to offset the points
		A1x = A1x * 2 -1
		A1y = A1y * 2 -1
		B1x = B1x * 2 -1
		B1y = B1y * 2 -1

		// now we have the fondations

		// // old version, with more efficiency but less readability
        // walls3D.push(A1x);
		// walls3D.push(A1y);
        // walls3D.push(0);
		
		// // B1
        // walls3D.push(B1x);
		// walls3D.push(B1y);
        // walls3D.push(0);
		
		// // A2
        // walls3D.push(A1x);
		// walls3D.push(A1y);
		// walls3D.push(height);

		// // B2
		// walls3D.push(B1x);
		// walls3D.push(B1y);
		// walls3D.push(height);

		// new version, more readability but less efficiency
		let ground1 = new Point(A1x, A1y, 0);
		let ground2 = new Point(B1x, B1y, 0);

		let top1 = new Point(A1x, A1y, height);
		let top2 = new Point(B1x, B1y, height);
		
		// // use only to get flat walls
		// push_face_into_wall(ground1, ground2, top1, top2, walls3D);
		
		// each wall has 5 faces (the 6th is on the ground)
		
		// vector ground1->ground2
		let g1_vector = [ 
			ground2.getX() - ground1.getX(),
			ground2.getY() - ground1.getY()
		];
		
		// vector ground2->ground1
		let g2_vector = [ 
			ground1.getX() - ground2.getX(),
			ground1.getY() - ground2.getY()
		];
		
		// vector top1->top2
		let t1_vector = [ 
			top2.getX() - top1.getX(),
			top2.getY() - top1.getY()
		];
		
		// vector top2->top1
		let t2_vector = [ 
			top1.getX() - top2.getX(),
			top1.getY() - top2.getY()
		];
		
		let new_ground1A = thicken_point(ground1, g1_vector, 1);
		let new_ground2A = thicken_point(ground2, g2_vector, -1);
		let new_top1A = thicken_point(top1, t1_vector, 1);
		let new_top2A = thicken_point(top2, t2_vector, -1);
		
		let new_ground1B = thicken_point(ground1, g1_vector, -1);
		let new_ground2B = thicken_point(ground2, g2_vector, 1);
		let new_top1B = thicken_point(top1, t1_vector, -1);
		let new_top2B = thicken_point(top2, t2_vector, 1);

		// face 1 and 2
		push_face_into_wall(new_ground1A, new_ground2A, new_top1A, new_top2A, walls3D);
		push_face_into_wall(new_ground1B, new_ground2B, new_top1B, new_top2B, walls3D);

		// face 3 and 4
		push_face_into_wall(new_ground1B, new_ground1A, new_top1B, new_top1A, walls3D);
		push_face_into_wall(new_ground2B, new_ground2A, new_top2B, new_top2A, walls3D);

		// face 5 (top)
		push_face_into_wall(new_top1B, new_top2B, new_top1A, new_top2A, walls3D);
	}

	return [walls3D, getIndices(walls3D)];
}

class Point {
	static copy(point) {
		return new Point (
				point.x,
				point.y,
				point.z);
	}

	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	getX() { return this.x; }
	getY() { return this.y; }
	getZ() { return this.z; }
	
	setX(x) { this.x = x; }
	setY(y) { this.y = y; }
	setZ(z) { this.z = z; }

	moveX(delta) { this.x += delta; }
	moveY(delta) { this.y += delta; }
	moveZ(delta) { this.z += delta; }
}

var CONST_ANGLE = 120*(Math.PI/180);
var CONST_COS = Math.cos(CONST_ANGLE);
var CONST_SIN = Math.sin(CONST_ANGLE);

function thicken_point(p1, vector, sign) {
	let thickness = 0.01;
	let new_point = Point.copy(p1);

	// old way, it is better to compute the cos and sin only once
	// let angle = sign*120*(Math.PI/180);
	// let cos_value = Math.cos(angle);
	// let sin_value = Math.sin(angle);
	// let translation_vector = get_translation_vector(vector, thickness, cos_value, sin_value);

	let translation_vector = get_translation_vector(vector, thickness, CONST_COS, CONST_SIN*sign);
	move_point(new_point, translation_vector);

	console.log(new_point);
	return new_point;
}

function move_point(p1, vector) {
	p1.moveX(vector[0]);
	p1.moveY(vector[1]);
}

function get_translation_vector(vector, thickness, cos_value, sin_value) {
	let vX = vector[0];
	let vY = vector[1];

	// normalize the vector
	let divisor = Math.sqrt(vX*vX + vY*vY);
	let nVector = [vX / divisor, vY / divisor];

	// rotate the vector
	let new_vector = [
        nVector[0] * cos_value - nVector[1] * sin_value,
        nVector[0] * sin_value + nVector[1] * cos_value
	]
	// adjust the norme of the vector
	return [new_vector[0] * thickness, new_vector[1] * thickness];
}

function push_face_into_wall(ground1, ground2, top1, top2, walls) {
	
	walls.push(ground1.getX());
	walls.push(ground1.getY());
	walls.push(ground1.getZ());
	
	walls.push(ground2.getX());
	walls.push(ground2.getY());
	walls.push(ground2.getZ());
	
	walls.push(top1.getX());
	walls.push(top1.getY());
	walls.push(top1.getZ());

	walls.push(top2.getX());
	walls.push(top2.getY());
	walls.push(top2.getZ());
}

function getIndices(walls) {
	// for 4 points : [0, 1, 2, 2, 1, 3]
	// 4 points == 1 wall
	// => for 8 points [0, 1, 2, 2, 1, 3,    4, 5, 6, 6, 7]
	// etc...
	
	// 1 point == 3 items in the wall
	// 4 points = 12 items
	if (walls.length % 12 != 0) {
		return null;
	}
	
	let ret = []

	// walls.length % 12 == 4
	for (let i = 0; i < walls.length; i += 4) {
		ret.push(i);
		ret.push(i+1);
		ret.push(i+2);
		ret.push(i+2);
		ret.push(i+1);
		ret.push(i+3);
	}
	return ret;
}