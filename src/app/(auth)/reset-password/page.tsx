"use client";

import React from "react";
import { Form, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/input/CustomInput";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onFinish = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("verifiedOtp");
      router.push("/auth/login");
    }, 1000);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
        <p className="text-gray-600">Create a new password for your account</p>
      </div>

      <Form
        form={form}
        name="reset-password"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="space-y-4"
      >
        <CustomInput
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          icon={<LockOutlined />}
          hasFeedback
        />

        <CustomInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          icon={<LockOutlined />}
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        />

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full !bg-primaryColor border-0 rounded-lg h-12 font-medium"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-6 text-center">
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
