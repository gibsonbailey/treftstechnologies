precision mediump float;

attribute vec2 a_position;
attribute vec2 a_tex_coord;

varying vec4 v_Color;
varying vec2 v_tex_coord;

void main()
{
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_Color = gl_Position;
    v_tex_coord = a_tex_coord;
}
