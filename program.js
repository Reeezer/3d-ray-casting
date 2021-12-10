"use strict";

class Shader {
	constructor(src, type, gl) {
		this.src = src;
		this.type = type;
		this.gl = gl;
	}

	compileShader() {
		let shader = this.gl.createShader(this.type);
		this.gl.shaderSource(shader, this.src);
		this.gl.compileShader(shader);
		let success = this.gl.getShaderParameter(
			shader,
			this.gl.COMPILE_STATUS
		);
		if (!success) {
			// Something went wrong during compilation; get the error
			throw (
				"could not compile shader:" + this.gl.getShaderInfoLog(shader)
			);
		}

		this.compiledShader = shader;
	}

	static createProgram(vs, fs, gl) {
		let program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		gl.validateProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			let info = gl.getProgramInfoLog(program);
			throw "Could not compile WebGL program. \n\n" + info;
		}

		gl.deleteShader(vs);
		gl.deleteShader(fs);

		return program;
	}

	static createProgramFromUrls(vsUrl, fsUrl, gl) {
		let vertexPromise = fetch(vsUrl)
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				let shader = new Shader(text, gl.VERTEX_SHADER, gl);
				shader.compileShader();
				return shader.compiledShader;
			});

		let fragmentPromise = fetch(fsUrl)
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				let shader = new Shader(text, gl.FRAGMENT_SHADER, gl);
				shader.compileShader();
				return shader.compiledShader;
			});

		return Promise.all([vertexPromise, fragmentPromise]).then(
			(shaders) => {
				return Shader.createProgram(shaders[0], shaders[1], gl);
			}
		);
	}
}