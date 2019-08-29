precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormal;

uniform sampler2D bailey_sampler;

void main()
{
   vec3 ambientLightIntensity = vec3(0.5, 0.5, 0.5);
   vec3 sunLightIntensity = vec3(0.5, 0.5, 0.5);
   vec3 sunLightDirection = normalize(vec3(0.0, -1.0, 1.0));

   vec3 lightIntensity = ambientLightIntensity + sunLightIntensity * max(dot(-fragNormal, sunLightDirection), 0.0);

   gl_FragColor = texture2D(bailey_sampler, fragTexCoord) * vec4(lightIntensity, 1);
}
