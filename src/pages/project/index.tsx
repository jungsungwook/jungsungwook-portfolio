import { isLoginState } from "@/states/is-login";
import axios, { Method } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import CardFrame from "@/components/card-frame"; // import the cardFrame component

const ProjectIndex = () => {
    return (
        <div className="pr-index-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                gap: "1rem",
            }}
        >
            <CardFrame title="My Project" description="This is a description of my project." />
            <CardFrame title="My Project2" description="This is a description of my project." />
            <CardFrame title="My Project3" description="This is a description of my project." />
        </div>
    );
}

export default ProjectIndex;