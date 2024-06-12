"use client"
import React, { useState, useEffect } from 'react';
import { JSX, SVGProps } from "react";
import validator from 'validator';
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../components/ui/tabs"

let tokenString: string | null;
if (typeof window !== 'undefined') {
    tokenString = localStorage.getItem('token');
}

export default function Account() {
    const router = useRouter();

    // Check if user is already logged-in and redirect them to the dashboard.
    useEffect(() => {
        tokenString = localStorage.getItem('token');
        const authToken = localStorage.getItem('token');
        if (authToken) {
            router.push('/dashboard');
        }
    });

    // Login states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Registration states
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    let [loginError, setLoginError] = useState(false);
    let [registerError, setRegisterError] = useState(false);
    let [registrationComplete, setRegistrationComplete] = useState(false);

    async function handleLogin(event: { preventDefault: () => void; }) {
        event.preventDefault()

        await fetch('http://localhost:5500/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((data) => data.json())
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('profile', response.profile);
                    router.push('/dashboard');
                } else {
                    setLoginError(true);
                }
            });

    }

    async function handleRegister(event: { preventDefault: () => void; }) {
        event.preventDefault()

        if (validator.isEmail(regEmail)) {
            await fetch('http://localhost:5500/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: regEmail, password: regPassword }),
            })
                .then((data) => data.json())
                .then((response) => {
                    if (response.status === 200) {
                        setRegEmail('');
                        setRegPassword('');
                        localStorage.setItem('token', JSON.stringify(response.token));
                        localStorage.setItem('profile', JSON.stringify(response.profile));
                        router.push('/dashboard');
                    } else {
                        setRegisterError(true);
                    }
                });
        } else {
            setRegisterError(true);
        }
        // Prevent changing URL string
        return false;
    }

    if (!tokenString) {
        return (
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-4/5 gap-6 px-3">
                        {loginError.toString() === 'true' &&
                            <p className='mx-auto text-xl text-red-600'>Invalid email or password.</p>
                        }
                        {registerError.toString() === 'true' &&
                            <p className='mx-auto text-xl text-red-600'>Please fill in all fields.</p>
                        }
                        {registrationComplete.toString() === 'true' &&
                            <p className='mx-auto text-xl text-red-600'>You may now login to your account.</p>
                        }
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50 mx-auto"
                            prefetch={false}
                        >
                            <LinkIcon className="h-6 w-6 fill-gray-900 dark:fill-gray-50" />
                            <span>URL Shortener</span>
                        </Link>

                        <Tabs defaultValue="login">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Login</CardTitle>
                                        <CardDescription>
                                            Welcome back. Login to manage your URLs.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="password">Password</Label>
                                            <Input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="bg-[#000000] w-full" onClick={handleLogin}>Login</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="register">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Register</CardTitle>
                                        <CardDescription>
                                            Create a new account to manage your URLs.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="reg-email">Email</Label>
                                            <Input required type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="reg-password">Set Password</Label>
                                            <Input required type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="New Password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="bg-[#000000] w-full" onClick={handleRegister}>Create Account</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/server.jpg"
                        alt="Image"
                        width="800"
                        height="500"
                        className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        );
    } else {
        router.push('/dashboard');
    }
}

function LinkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}


