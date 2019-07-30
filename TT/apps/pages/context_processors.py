from django.conf import settings # import the settings file

def built_js(request):
    # return the value you want as a dictionnary. you may add multiple values in there.
    return {'BUILT_JS': settings.BUILT_JS}