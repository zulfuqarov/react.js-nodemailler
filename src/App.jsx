import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState('')
  const HandleChangeText = (e)=>{
    setText(e.target.value);
  }
  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/send-email?to=${email}&htmltext=${text}`);

      if (response.status === 200) {
        console.log("E-posta gönderildi.");
        // Burada e-posta gönderildiğine dair bir bildirim veya görsel geri bildirim sağlayabilirsiniz.
      } else {
        console.log("E-posta gönderilemedi.");
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  return (
    <div>
      <input value={email} onChange={HandleChangeEmail} type="text" />
      <input type="text" value={text} onChange={HandleChangeText} />
      <button onClick={handleButtonClick}>click</button>
    </div>
  );
};

export default App;
