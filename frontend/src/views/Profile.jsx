import React, { useRef } from "react";
import { useState } from "react";
import Avatar from "../assets/avatar.png";
import { useStateContext } from "../context/ContextProvider";
import { updateUserProfile, uploadProfilePhoto } from "../services/userService";

const Profile = () => {
  const { user, setUser, setNotification } = useStateContext();

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [error, setError] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const uploadPhoto = async (ev) => {
    ev.preventDefault();
    const file = ev.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      // upload to server
      const response = await uploadProfilePhoto(formData);
      setProfilePhoto(response.data);
      setNotification("Photo uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (ev) => {
    ev.preventDefault();
    setError(null);
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      photo: user.photo,
    };

    if (profilePhoto) userData.photo = profilePhoto;

    try {
      const response = await updateUserProfile(userData);
      setUser(response.data);
      setNotification("Profile updated successfully");
    } catch (error) {
      const { response } = error;
      setError(response.data);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
          My Profile
        </h1>
      </div>

      <div className="border mt-5 bg-white  m-auto">
        <div className="grid p-4 grid-cols-1 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col items-center justify-center">
            {profilePhoto ? (
              <img
                src={`${
                  import.meta.env.VITE_API_BASE_URL
                }/uploads/${profilePhoto}`}
                alt="img"
                className="rounded-full w-[200px]"
              />
            ) : (
              <img
                src={
                  user.photo
                    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${
                        user.photo
                      }`
                    : Avatar
                }
                alt="img"
                className="rounded-full w-[200px]"
              />
            )}

            <div>
              <label className="h-10 flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer my-5">
                <input type="file" className="hidden" onChange={uploadPhoto} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
          </div>
          <div className="flex-1">
            <form onSubmit={updateProfile}>
              {error && (
                <p className="py-2 px-3 text-center w-[100%] bg-red-500 mb-4 text-white">
                  {error}
                </p>
              )}

              <div className="w-[100%] mb-2">
                <label>Full Name</label>
                <input
                  className="w-full border my-2 py-2 px-3 rounded-md"
                  name="Email"
                  type="text"
                  defaultValue={user.name}
                  placeholder="John Doe"
                  ref={nameRef}
                />
              </div>

              <div className="w-[100%] mb-2">
                <label>Email</label>
                <input
                  className="w-full border my-2 py-2 px-3 rounded-md"
                  name="Email"
                  defaultValue={user.email}
                  disabled={true}
                  type="email"
                  ref={emailRef}
                  placeholder="johndoe@gmail.com"
                />
              </div>

              <div className="w-[100%] mb-2">
                <label>Phone</label>
                <input
                  className="w-full border my-2 py-2 px-3 rounded-md"
                  name="phone"
                  defaultValue={user.phone}
                  type="text"
                  placeholder="E.g. +256 7078967"
                  ref={phoneRef}
                />
              </div>
              <button className="bg-primary px-3 py-2 text-white mt-3 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
