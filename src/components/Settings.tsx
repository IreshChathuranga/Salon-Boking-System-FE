import { useState } from "react";
import { updateCredentials } from "../services/auth";

export default function Settings() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    try {
      const res = await updateCredentials(oldPassword, newPassword, email);
      console.log(res);
      alert("Credentials Updated!");

      setEmail("");
      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  return (
    <div className="p-6 border-2 border-[#d4af37] rounded-3xl bg-card w-max">
      <h2 className="font-serif rounded-2xl text-white bg-black/50 text-2xl w-max text-primary px-2 border mb-6">Change Email & Password</h2>

      <div className="space-y-4 max-w-md">

        <div className="border-b border-border">
          <label className="block font-medium">New Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="border-b border-border">
          <label className="block font-medium">Old Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="border-b border-border">
          <label className="block font-medium">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="gold-btn w-full text-black py-2 rounded-lg"
        >
          Update Credentials
        </button>
      </div>
    </div>
  );
}
