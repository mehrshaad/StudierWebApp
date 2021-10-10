from django.shortcuts import render
from django.http import HttpRequest
from datetime import datetime
from .models import Newuser
from django.shortcuts import redirect


def checkSignUp(name, email, password):
    try:
        Newuser.objects.get(email=str(email))
        return False
    except:
        return True


def checkLogin(email, pas):    
    try:
        old = Newuser.objects.get(email=str(email))
        # print(old.password,str(pas))
        if old.password == str(pas):
            return True
        return False
    except:
        return False
    return False


def index(request):
    # assert isinstance(request, HttpRequest)
    if request.method == 'POST':
        if checkSignUp(request.POST.get('fullname'),
                       request.POST.get('email'),
                       request.POST.get('password')):  # sign up
            post = Newuser()
            post.fullname = request.POST.get('fullname')
            post.email = request.POST.get('email')
            post.password = request.POST.get('password')
            post.save()
            response = redirect('/signUp')
            return response
        elif checkLogin(request.POST.get('email'),
                        request.POST.get('password')):  #sign in

            response = redirect('/dashboard')
            return response
    else:
        return home(request)
    return home(request)


def home(request):
    return render(request, 'index.html', {
        'title': 'Home Page',
        'year': datetime.now().year,
    })


def dashboard(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(request, 'dashboard.html', {
        'title': 'Dashboard Page',
        'year': datetime.now().year,
    })


def signUp(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(request, 'signUp.html', {
        'title': 'Sign Up Page',
        'year': datetime.now().year,
    })
