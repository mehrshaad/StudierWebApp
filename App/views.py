from django.shortcuts import render
from django.http import HttpRequest
from datetime import datetime, date, timedelta
from .models import User
from .models import Store
from .models import Course
from django.shortcuts import redirect
from django.contrib import messages


def checkSignUp(username, email, pas):
    try:
        User.objects.get(Email=str(email))
        return False
    except:
        try:
            User.objects.get(Username=str(username))
            return False
        except:
            return True
    return True


def checkLogin(info, pas):
    try:
        acc = User.objects.get(Email=str(info))
    except:
        try:
            acc = User.objects.get(Username=str(info))
        except:
            return False
    if acc.Password == str(pas):
        return True
    return False


def index(request):
    if request.method == 'POST':
        if request.POST.get('username') and request.POST.get(
                'email') and request.POST.get('password'):
            if checkSignUp(request.POST.get('username'),
                           request.POST.get('email'),
                           request.POST.get('password')):
                post = User()
                post.Username = request.POST.get('username')
                post.Email = request.POST.get('email')
                post.Password = request.POST.get('password')
                request.session['username'] = request.POST.get('username')
                post.save()
                response = redirect('/signUp')
                return response
            elif len(request.POST.get('password')) < 8:
                messages.add_message(
                    request, messages.INFO,
                    'Your password must be at least 8 characters!')
            else:
                messages.add_message(
                    request, messages.INFO,
                    'That email or username is already taken, Try another!')
        elif request.POST.get('email') and request.POST.get('password'):
            if checkLogin(request.POST.get('email'),
                          request.POST.get('password')):
                request.session['username'] = request.POST.get('email')
                response = redirect('/dashboard')
                return response
            else:
                messages.add_message(request, messages.INFO,
                                     'Wrong password or username!')
    else:
        return home(request)
    return home(request)


def home(request):
    return render(request, 'index.html', {
        'title': 'Home Page',
        'year': datetime.now().year,
    })


def dashboard(request):
    try:
        user = User.objects.get(Username=str(request.session['username']))
    except:
        user = User.objects.get(Email=str(request.session['username']))
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request, 'dashboard.html', {
            'title': 'Dashboard Page',
            'year': datetime.now().year,
            'firstname': user.Username,
            'lastname': user.Lastname,
            'coin': user.Coin
        })


def signUp(request):
    try:
        user = User.objects.get(Username=str(request.session['username']))
    except:
        user = User.objects.get(Email=str(request.session['username']))
    if request.method == 'POST':
        if request.POST.get('Firstname'):
            user.Firstname = request.POST.get('Firstname')
            user.Lastname = request.POST.get('Lastname')
            user.Dob = request.POST.get('DOB')
            user.save()
            store = Store()
            store.user = user
            store.save()
            i = 0
            while True:
                i += 1
                if request.POST.get(f'course{i}'):
                    post = Course()
                    post.user = user
                    post.Name = str(
                        request.POST.get(f'course{i}') + "/" + user.Username)
                    post.Priority = request.POST.get(f'priority{i}')
                    post.save()
                else:
                    break
            request.session['username'] = user.Username
            response = redirect('/dashboard')
            return response
    assert isinstance(request, HttpRequest)
    return render(request, 'signUp.html', {
        'title': 'Sign Up Page',
        'year': datetime.now().year
    })


def profile(request):
    try:
        user = User.objects.get(Username=str(request.session['username']))
    except:
        user = User.objects.get(Email=str(request.session['username']))
    li = [
        str(x.Name).replace(f'/{user.Username}', '')
        for x in Course.objects.filter(user_id=user.Email)
    ]
    assert isinstance(request, HttpRequest)
    return render(
        request, 'profile.html', {
            'title': 'Profile Page',
            'year': datetime.now().year,
            'fullname': f'Hi, {user.Firstname} {user.Lastname}',
            'firstname': user.Firstname,
            'lastname': user.Lastname,
            'username': user.Username,
            'email': user.Email,
            'age': f'{(date.today()-user.Dob).days//365} Years Old!',
            'coin': user.Coin,
            'avatar': str(user.store.avatar),
            'course': li
        })


def pom(request):
    time = 1500
    try:
        user = User.objects.get(Username=str(request.session['username']))
    except:
        user = User.objects.get(Email=str(request.session['username']))

    li = [
        str(x.Name).replace(f'/{user.Username}', '')
        for x in Course.objects.filter(user_id=user.Email)
    ]
    if request.method == 'POST':
        coursename = str(
            request.POST.get('selectedCourse') + "/" + user.Username)
        course = Course.objects.get(Name=coursename)
        try:
            if (request.session['lastcourse']
                    == request.POST.get('selectedCourse')
                    and request.POST.get('mode') == 'pomodoro'
                    and request.session['coursekey']):
                # print(1)
                course.Total_time += request.session['lasttime'] - \
                    int(request.POST.get('time'))
                request.session['lasttime'] = int(request.POST.get('time'))
                course.save()
                # print(course.Total_time, request.session['lasttime'], int(
                #     request.POST.get('time')))
            elif request.POST.get('mode') == 'pomodoro' and int(
                    request.POST.get('time')) != -1:
                # print(2,request.POST.get('time'))
                course.Total_time += time - int(request.POST.get('time'))
                request.session['lastcourse'] = request.POST.get(
                    'selectedCourse')
                request.session['coursekey'] = True
                request.session['lasttime'] = int(request.POST.get('time'))
                course.save()
            else:
                # print(3)
                request.session['coursekey'] = False
        except:
            if request.POST.get('mode') == 'pomodoro' and int(
                    request.POST.get('time')) != -1:
                # print(4)
                # print(request.POST.get('time'))
                course.Total_time += time - int(request.POST.get('time'))
                request.session['lastcourse'] = request.POST.get(
                    'selectedCourse')
                request.session['coursekey'] = True
                request.session['lasttime'] = int(request.POST.get('time'))
                course.save()
            else:
                # print(5)
                request.session['coursekey'] = False
    else:
        try:
            del request.session['lastcourse']
            del request.session['coursekey']
            del request.session['lasttime']
        except KeyError:
            pass
    return render(
        request, 'pom.html', {
            'title': 'Pomodoro Page',
            'year': datetime.now().year,
            'username': user.Username,
            'course': li
        })


def store(request):
    try:
        user = User.objects.get(Username=str(request.session['username']))
    except:
        user = User.objects.get(Email=str(request.session['username']))
    if request.method == 'POST':
        if request.POST.get('code') == 'username':
            try:
                user.Username = request.POST.get('newUsername')
                user.save()
            except Exception as a:
                messages.add_message(
                    request, messages.INFO,
                    'That username is already taken, Try another!')
        elif request.POST.get('code') == 'doubleCoin':
            mode = int(request.POST.get('mode'))
            user.store.Doublecoin = True
            if mode == 100:
                user.Coin -= 100
                user.store.Doublecoin_time = timedelta(days=2) + datetime.now()
                user.store.save()
                user.save()
            elif mode == 500:
                user.Coin -= 500
                user.store.Doublecoin_time = timedelta(
                    days=14) + datetime.now()
                user.store.save()
                user.save()
            elif mode == 800:
                user.Coin -= 800
                user.store.Doublecoin_time = timedelta(
                    days=31) + datetime.now()
                user.store.save()
                user.save()
        elif request.POST.get('code') == 'darkMode':
            if user.store.dark_mode:
                messages.add_message(request, messages.INFO,
                                     'You already bought it before')
            user.Coin -= 500
            user.store.dark_mode = True
            user.save()
        elif request.POST.get('code') == 'avatar':
            user.store.avatar = request.POST.get('avatarCode')
            user.store.save()
            user.save()
        elif request.POST.get('code') == 'ml':
            pass
            # user.save()
    else:
        pass
    return render(
        request, 'store.html', {
            'title': 'Store Page',
            'year': datetime.now().year,
            'firstname': user.Firstname,
            'lastname': user.Lastname,
            'username': user.Username,
            'coin': user.Coin,
            'doubleCoin': user.store.Doublecoin,
            'doubleCoinTime': user.store.Doublecoin_time,
            'avatarsCount': range(1, 17),
            'allUsernames': [x.Username for x in User.objects.all()]
        })
