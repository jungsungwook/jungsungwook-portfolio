const CareerPage = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <div className="profile-skill"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    // 맨 위로 붙이기
                    marginTop: "0px",
                    // 왼쪽으로 붙이기
                    marginLeft: "20px",
                    // 간격
                    gap: "9px",
                }}
            >
                <div className="profile-skill-title"
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <span className="en"
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        Career
                    </span>
                </div>
                <hr style={{
                    width: "95%",
                    margin: "5px 0 0 0",
                    border: "2px solid rgba(0,0,0,.15)",
                }} />
                <div className="profile-skill-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Language
                        </span>
                        <span className="en"
                            style={{
                                fontSize: "15px",
                            }}
                        >
                            JavaScript, TypeScript, Python, C#, Java
                        </span>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Framework
                        </span>
                        <span className="en"
                            style={{
                                fontSize: "15px",
                            }}
                        >
                            NestJS, Next.js, Node.js, Express, Spring Boot
                        </span>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Database
                        </span>
                        <span className="en"
                            style={{
                                fontSize: "15px",
                            }}
                        >
                            MySQL, MariaDB, PostgreSQL, Redis
                        </span>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Extra & Workout
                        </span>
                        <span className="en"
                            style={{
                                fontSize: "15px",
                            }}
                        >
                            Git, Docker, Oracle Cloud, AWS(EC2, Lambda, SQS), Firebase, Jenkins, Unity, TensorFLow, PyTorch, Elastic Search, OpenCV, Puppeteer, Keras 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CareerPage;