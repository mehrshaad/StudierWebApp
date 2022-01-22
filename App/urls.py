from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('signUp/', views.signUp, name="signUp"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('profile/', views.profile, name="profile"),
    path('pom/', views.pom, name="pom"),
    path('chart/', views.pom, name="chart"),
    path('store/', views.store, name="store"),
    path('analysis/', views.analysis, name="analysis"),
    # path('request/', views.send_request, name='request'),
    # path('verify/', views.verify , name='verify')
]
