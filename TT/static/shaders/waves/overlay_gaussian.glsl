precision mediump float;

uniform sampler2D gaussian;
uniform sampler2D background;

varying vec2 v_background_tex_coord;
varying vec2 v_gaussian_tex_coord;

vec4 encode(float z);
float decode(vec4 rgba);

void main()
{
    float background_value = decode(texture2D(background, v_background_tex_coord));
    float gaussian_value = float(texture2D(gaussian, v_gaussian_tex_coord).x);
//    gaussian_value = float(texture2D(gaussian, v_background_tex_coord).x);
    gl_FragColor = encode(background_value + gaussian_value);
//    gl_FragColor = encode(gaussian_value);
}

vec4 encode(float z)
{
    z = clamp(z, 0.0000001, 0.9999999); // for z = 1.0, the 1 would be lost, and after unpacking we'd obtain 0.0
    vec4 enc = vec4(1.0, 255.0, 255.0*255.0, 255.0*255.0*255.0) * z;
    enc = fract(enc);
    enc -= enc.gbaa * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
}

float decode(vec4 rgba)
{
    return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0)) );
}
