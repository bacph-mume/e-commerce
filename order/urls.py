from django.urls import path
from order import views
from rest_framework.routers import DefaultRouter


urlpatterns = [

]

router = DefaultRouter()
router.register("", views.OrderViewSet)

urlpatterns += router.urls
