from django.urls import path

from django.urls import path
from .views import SkillListCreateView, SkillDetailView,get_user_skills

urlpatterns = [
    path("", SkillListCreateView.as_view(), name="skill-list-create"),
  
    path('<int:pk>/', SkillDetailView.as_view(), name='skill-detail'),

    # ✅ Add this route to fetch skills by user ID
    path('user/<int:user_id>/', get_user_skills, name='user-skills'),
]

