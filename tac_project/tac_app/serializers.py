from rest_framework import serializers
from .models import User, Transaction
from uuid import uuid4

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'account_number', 'ifsc_code', 'balance', 'tans']
        extra_kwargs = {
            'account_number': {'read_only': True},
            'ifsc_code': {'read_only': True},
            'balance': {'read_only': True},
            'tans': {'read_only': True}
        }

    def create(self, validated_data):
        validated_data['account_number'] = self.generate_account_number()
        validated_data['tans'] = self.generate_tans(validated_data['username'])
        user = User.objects.create_user(**validated_data)
        return user
    def generate_account_number(self):
        from random import randint
        return str(randint(1000000000, 9999999999))

    def generate_tans(self, username):
        keyword = "KEYWORD"  # You can change this keyword
        plaintext = username.encode('utf-8')  # Convert username to bytes
        keyword = keyword.encode('utf-8')  # Convert keyword to bytes
        key_len = len(keyword)
        tans = []

        for i in range(len(plaintext)):
            shift = keyword[i % key_len]
            encrypted = (plaintext[i] + shift) % 256  # Perform Vigenère cipher logic
            tans.append(f'TAN{encrypted}')  # Placeholder for your TAN format

        return tans

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
