import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
		<Authenticator
			initialState="signIn"
			loginMechanisms={['email']}
			formFields={{
				signIn: {
					username: {
						label: 'Email',
						placeholder: 'name@example.com'
					},
					password: {
						label: 'Password',
						placeholder: 'Enter your password'
					}
				},
				signUp: {
					email: {
						label: 'Email address',
						placeholder: 'name@example.com'
					},
					password: {
						label: 'Password',
						placeholder: 'At least 8 characters'
					},
					confirm_password: {
						label: 'Confirm password',
						placeholder: 'Re-enter your password'
					}
				},
				forceNewPassword: {
					password: {
						label: 'New password',
						placeholder: 'Enter a new password'
					}
				}
			}}
			components={{
				Header() {
					return (
						<div style={{ padding: 16, textAlign: "center" }}>
							<h2 style={{ margin: 0 }}>Welcome back</h2>
							<p style={{ margin: "6px 0 0", opacity: 0.8 }}>Sign in to continue</p>
						</div>
					);
				},
				Footer() {
					return (
						<div style={{ padding: 12, textAlign: "center", opacity: 0.9 }}>
							<small>Powered by AWS Amplify</small>
						</div>
					);
				},
				SignIn: {
					Header() {
						return (
							<div style={{ padding: 12, textAlign: "center" }}>
								<h3 style={{ margin: 0 }}>Sign in</h3>
							</div>
						);
					}
				},
				SignUp: {
					Header() {
						return (
							<div style={{ padding: 12, textAlign: "center" }}>
								<h3 style={{ margin: 0 }}>Create your account</h3>
							</div>
						);
					}
				}
			}}
		>
			<App />
		</Authenticator>
  </React.StrictMode>
);
