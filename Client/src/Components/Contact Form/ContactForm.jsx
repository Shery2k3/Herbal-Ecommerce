import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import "./ContactForm.css";
import API_BASE_URL from "../../constants"

function ContactForm() {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    handleSubmit(values);
  };

  const handleSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/email/send/`, {
        subject: "Contact-Form",
        text: `
          <p><strong>Name:</strong> ${formValues.user.name}</p>
          <p><strong>Email:</strong> ${formValues.user.email}</p>
          <p><strong>Message:</strong> ${formValues.user.message}</p>
        `,
      });
      message.success("Message sent successfully! We'll get back to you soon.");
      formRef.current.resetFields();
    } catch (error) {
      message.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "#ffffff",
              labelRequiredMarkColor: "#f30128",
            },
            Input: {
              colorBgContainer: "rgba(255, 255, 255, 0.05)",
              colorBorder: "rgba(255, 255, 255, 0.2)",
              colorText: "#ffffff",
              colorTextPlaceholder: "rgba(255, 255, 255, 0.5)",
              borderRadius: 8,
              controlHeight: 48,
            },
            Button: {
              primaryShadow: "none",
              controlHeight: 48,
              borderRadius: 8,
            },
          },
          token: {
            colorPrimary: "#f30128",
            borderRadius: 8,
          },
        }}
      >
        <div className="contact-form-container" ref={sectionRef}>
          <div className="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>
          
          <Form
            requiredMark={false}
            name="contact-form"
            onFinish={onFinish}
            className="contact-form"
            validateMessages={validateMessages}
            ref={formRef}
            layout="vertical"
          >
            <Form.Item
              name={["user", "name"]}
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input 
                placeholder="Enter your full name" 
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name={["user", "email"]}
              label="Email Address"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input 
                placeholder="Enter your email address" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name={["user", "message"]}
              label="Message"
              rules={[
                {
                  required: true,
                  message: "Please enter your message",
                },
              ]}
            >
              <Input.TextArea 
                rows={6} 
                placeholder="Tell us how we can help you..."
                style={{ resize: 'none' }}
              />
            </Form.Item>

            <Form.Item className="submit-button-container">
              <Button 
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="submit-button"
                block
                size="large"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ConfigProvider>
    </>
  );
}

export default ContactForm;
