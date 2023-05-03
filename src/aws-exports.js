/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": process.env.NEXT_PUBLIC_REGION,
    "aws_cognito_identity_pool_id": process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.NEXT_PUBLIC_REGION,
    "aws_user_pools_id": process.env.NEXT_PUBLIC_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.NEXT_PUBLIC_REGION,
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL",
        "NAME"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS",
            "REQUIRES_UPPERCASE"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;