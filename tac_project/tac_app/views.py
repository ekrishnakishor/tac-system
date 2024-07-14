from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import User, Transaction
from .serializers import UserSerializer, TransactionSerializer

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SignInView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({'user_id': user.id})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            data = {
                'bank_name': 'TAN Bank',
                'account_number': user.account_number,
                'ifsc_code': user.ifsc_code,
                'balance': user.balance
            }
            return Response(data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class GenerateTANView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            # Generate a TAN using the Vigenère cipher logic (Placeholder for now)
            tan = 'NEWTAN'  # Placeholder TAN
            return Response({'tan': tan})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class TransferView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        sender_id = request.data.get('sender_id')
        receiver_account = request.data.get('receiver_account')
        amount = request.data.get('amount')
        tan = request.data.get('tan')

        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(account_number=receiver_account)

            if tan not in sender.tans:
                return Response({'error': 'Invalid TAN'}, status=status.HTTP_400_BAD_REQUEST)

            # Perform the transfer
            sender.balance -= float(amount)
            receiver.balance += float(amount)

            # Remove used TAN
            sender.tans.remove(tan)

            # Save changes
            sender.save()
            receiver.save()

            # Create transaction record
            Transaction.objects.create(sender=sender, receiver=receiver, amount=amount)

            return Response({'message': 'Transfer successful'})
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            user_id = self.kwargs['pk']
            return Transaction.objects.filter(sender_id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
