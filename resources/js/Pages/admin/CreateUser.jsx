import React, { useEffect } from "react";
import Button from "../../Components/Button";
import Guest from "../Layouts/Guest";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import ValidationErrors from "../../Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUser = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/admin/get-users",
                data
            );
            console.log(response);
            if (response.status === 201) {
                data.name = "";
                data.email = "";
                data.password = "";
                data.password_confirmation = "";
                setData("");
                toast(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Head title="Create User" />
            <Head title="Create User" />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
               

                    <Button className="ml-4" processing={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateUser;
