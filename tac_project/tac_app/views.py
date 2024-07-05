from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import TAC
from .serializers import UserSerializer, TACSerializer

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

class GenerateTACView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        tac_code = self.generate_tac(user_id)
        tac = TAC.objects.create(user_id=user_id, tac_code=tac_code)
        return Response(TACSerializer(tac).data)

    def generate_tac(self, user_id):
        # Implementation of Vigenère cipher
        key = "SECRETKEY"  # You can use a more complex key management system
        return self.vigenere_encrypt(str(user_id), key)

    def vigenere_encrypt(self, text, key):
        key = key * (len(text) // len(key)) + key[:len(text) % len(key)]
        encrypted = ''.join([chr(((ord(text[i]) + ord(key[i])) % 26) + 65) for i in range(len(text))])
        return encrypted

class VerifyTACView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        tac_code = request.data.get('tac_code')
        if not tac_code:
            return Response({'error': 'TAC code is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tac = TAC.objects.get(user_id=user_id, tac_code=tac_code)
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except TAC.DoesNotExist:
            return Response({'error': 'Invalid TAC code'}, status=status.HTTP_400_BAD_REQUEST)
