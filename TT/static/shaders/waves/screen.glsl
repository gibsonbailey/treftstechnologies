precision mediump float;

uniform sampler2D simulation_texture;
uniform sampler2D boundary_conditions;

varying vec2 v_tex_coord;

float decode(vec4 rgba);

void main()
{
    float simulation_value = decode(texture2D(simulation_texture, v_tex_coord));
    float boundary_condition_value = decode(texture2D(boundary_conditions, v_tex_coord));

    float pixel_color = 2.0 * max(boundary_condition_value, simulation_value);
    gl_FragColor = vec4(0.6 * pixel_color, 0.8 * pixel_color, pixel_color, 1.0);
}

float decode(vec4 rgba)
{
    return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0)) );
}

