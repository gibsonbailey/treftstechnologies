precision mediump float;

uniform sampler2D input_texture;

varying vec2 v_tex_coord;

vec4 encode(float z);

void main()
{
    vec4 pixel_color = texture2D(input_texture, v_tex_coord);
    float value = (pixel_color.x + pixel_color.y + pixel_color.z) / 3.0;
    gl_FragColor = encode(value);
}

vec4 encode(float z)
{
    z = clamp(z, 0.0000001, 0.9999999); // for z = 1.0, the 1 would be lost, and after unpacking we'd obtain 0.0
    vec4 enc = vec4(1.0, 255.0, 255.0*255.0, 255.0*255.0*255.0) * z;
    enc = fract(enc);
    enc -= enc.gbaa * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
}
