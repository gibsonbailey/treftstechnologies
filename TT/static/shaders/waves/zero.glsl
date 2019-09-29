precision mediump float;

vec4 encode(float z);

void main()
{
    gl_FragColor = encode(0.0);
}

vec4 encode(float z)
{
    z = clamp(z, 0.0000001, 0.9999999); // for z = 1.0, the 1 would be lost, and after unpacking we'd obtain 0.0
    vec4 enc = vec4(1.0, 255.0, 255.0*255.0, 255.0*255.0*255.0) * z;
    enc = fract(enc);
    enc -= enc.gbaa * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
}
