precision mediump float;

attribute vec2 a_position;
attribute vec2 a_tex_coord;

varying vec2 v_background_tex_coord;
varying vec2 v_brush_tex_coord;


uniform mat3 u_tex_coord_center_matrix;

void main()
{
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_background_tex_coord = a_tex_coord;

    v_brush_tex_coord = (u_tex_coord_center_matrix * vec3(a_tex_coord.x, a_tex_coord.y, 1.0)).xy;
}
