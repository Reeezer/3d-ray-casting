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

		let walls = [0.1, 0.1, 0.9, 0.9, 0.1, 0.9, 0.9, 0.1];

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
			0.1, 0.1, 0.9, 0.9, //draws wall from (0.1, 0.1) to (0.9, 0.9)
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
	
	let height = 2.0;
	let walls3D = [];
    //Assert walls2D.length % 4 == 0
	
	// DO NOT USE TRIANGLESTRIP, USE TRIANGLES
	for (let i = 0; i < walls2D.length / 4; i++) {
		let currIndex = i * 4;
		console.log(walls2D[currIndex] + " ");
		let A1x = walls2D[currIndex];
		let A1y = walls2D[currIndex+1];
		let B1x = walls2D[currIndex+2];
		let B1y = walls2D[currIndex+3];
        
		// A1
        walls3D.push(A1x);
		walls3D.push(A1y);
        walls3D.push(0);
		
		// B1
        walls3D.push(B1x);
		walls3D.push(B1y);
        walls3D.push(0);
		
		// A2
        walls3D.push(A1x);
		walls3D.push(A1y);
		walls3D.push(height);

		// B2
		walls3D.push(B1x);
		walls3D.push(B1y);
		walls3D.push(height);
		break;
    }
	
	return walls3D;
}