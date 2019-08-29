function build_program(gl, vertex_shader_text, fragment_shader_text, program_name) {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, vertex_shader_text)
    gl.shaderSource(fragmentShader, fragment_shader_text)

    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader for ' + program_name + ' program.', gl.getShaderInfoLog(vertexShader))
        return
    }

    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader for ' + program_name + ' program.', gl.getShaderInfoLog(fragmentShader))
        return
    }

    let program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking ' + program_name + ' program.', gl.getProgramInfoLog(program))
        return
    }

    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating ' + program_name + ' program.', gl.getProgramInfoLog(program))
        return
    }
    return program
}
