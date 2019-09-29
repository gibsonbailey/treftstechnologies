precision mediump float;

uniform sampler2D input_texture;

varying vec2 v_tex_coord;

void main()
{
    gl_FragColor = texture2D(input_texture, v_tex_coord);
}
