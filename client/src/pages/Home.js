import React from "react";
import { Redirect,Link } from "react-router-dom";
import { Button } from "../styles";
import "./home.css";

export default function Home({ user }) {
  if (user) return <Redirect to="/questions" />;
  return (
    <>
    <div style={{display: "flex",
    backgroundColor: "#C9E7F2"
  }}>
      <div  
        style={{
          display: "flex",
          alignItems: "center",
          height: "77vh",
          marginLeft: "30px"
        }}
      >
        <div
          style={{
            paddingLeft: "50px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "60px",
              }}
            >
              Identify A Problem,
              <br /> consult from your peers
            </h2>
            <h5
              style={{
                fontSize: "25px",
              }}
            >
              Understand the problem with your device,
              <br /> get posible solutions before contacting a technician
            </h5>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "80px",
              padding: "20px",
            }}
          >
            <Button className="homeBtn" as={Link} to="/signup" >Get Started</Button>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: "100px",
        marginRight: "-50px"
      }}>

        <img src={process.env.PUBLIC_URL+"image1.png"} />

      </div>

      <div style={{
        paddingTop: "60px"

      }}>

      <img src={process.env.PUBLIC_URL+"image2.png"} />
        

      </div>
      </div>

      <div style={{
        height:"11vh",
        display:"flex",
        backgroundColor: "#2C2C2C",
        color: "white",
        alignItems: "center",
        paddingLeft: "50px"
      }}>
        <h3>Talk to us</h3>
      </div>
      <div style={{
        height:"5vh",
        display:"flex",
        color: "black",
        alignItems: "center",
        justifyContent:"center",
        paddingLeft: "50px",
        backgroundColor: "#C9E7F2"

      }}>
        <h3>&copy; PhoLaChat 2022</h3>
      </div>
    </>
  );
}
