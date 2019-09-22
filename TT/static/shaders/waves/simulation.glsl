precision mediump float;

uniform sampler2D previous_mesh;
uniform sampler2D current_mesh;
uniform vec2 resolution;

varying vec2 v_tex_coord;

vec4 encode(float z);
float decode(vec4 rgba);

void main()
{
    float c = 0.5;
    float dx = resolution.x;
    float dy = resolution.y;
    float dt = 0.0001;
    float scale = 1.0;
    dx *= scale;
    dy *= scale;
    dt *= scale;

    float u = decode(texture2D(current_mesh, v_tex_coord));
    float u_x_high = decode(texture2D(current_mesh, v_tex_coord + vec2(dx, 0)));
    float u_x_low = decode(texture2D(current_mesh, v_tex_coord + vec2(-dx, 0)));
    float u_y_high = decode(texture2D(current_mesh, v_tex_coord + vec2(0, dy)));
    float u_y_low = decode(texture2D(current_mesh, v_tex_coord + vec2(0, -dy)));
    float u_previous = decode(texture2D(previous_mesh, v_tex_coord));

    float u_xx = (u_x_high - (2.0 * u) + u_x_low)/ (dx * dx);
    float u_yy = (u_y_high - (2.0 * u) + u_y_low)/ (dy * dy);
    float u_next = (c * c * dt * dt * (u_xx + u_yy)) + (2.0 * u) - u_previous;

    gl_FragColor = encode(u_next);
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
