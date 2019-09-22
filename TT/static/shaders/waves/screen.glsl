precision mediump float;


uniform sampler2D input_texture;

varying vec4 v_Color;
varying vec2 v_tex_coord;

float decode(vec4 rgba);

void main()
{
    vec4 pixel_color = texture2D(input_texture, v_tex_coord);
    float gray = decode(pixel_color);
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}

float decode(vec4 rgba)
{
    return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0)) );
}

