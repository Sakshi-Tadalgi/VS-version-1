from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Skill, SkillAnalytics
from .serializers import SkillSerializer, SkillAnalyticsSerializer


# ✅ List or Create Skills
class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ✅ Retrieve, Update, or Delete a Skill
class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        skill = super().get_object()
        if skill.user != self.request.user:
            raise PermissionDenied("You do not have permission to access this skill.")
        return skill


# ✅ Fetch all skills for a given user (for public profile)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_skills(request, user_id):
    skills = Skill.objects.filter(user__id=user_id)
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)


# ✅ Skill analytics
class SkillAnalyticsView(generics.RetrieveAPIView):
    queryset = SkillAnalytics.objects.all()
    serializer_class = SkillAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]
