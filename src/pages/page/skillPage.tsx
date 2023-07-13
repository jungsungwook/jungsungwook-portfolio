const SkillPage = () => {
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
                        Skills
                    </span>
                </div>
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
                            C, C++, C#, Java, Python, JavaScript, TypeScript
                        </span>
                    </div>
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
                            React, React Native, Node.js, Express, Django, Flask, Spring, Spring Boot
                        </span>
                    </div>
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
                            MySQL, MariaDB, MongoDB, Redis
                        </span>
                    </div>
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
                            Git, Docker, AWS, Azure, Google Cloud Platform, Firebase, Jenkins, Travis CI, Circle CI, Jira, Confluence, Slack, Notion, Trello, Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe After Effects, Blender, Unity, Unreal Engine 4
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillPage;