const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const coursesData = [
  {
    id: 1,
    title: "Machine Learning A-Z: Hands-On Python & R",
    description: "Learn to create Machine Learning Algorithms in Python and R",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "44 hours",
    tags: ["machine learning", "python", "data science"],
    youtube_link: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    udemy_link: "https://www.udemy.com/course/machinelearning/",
    coursera_link: "https://www.coursera.org/learn/machine-learning",
    geeksforgeeks_link: "",
    trending_score: 98
  },
  {
    id: 2,
    title: "Complete Web Development Bootcamp 2025",
    description: "The only course you need to become a full-stack web developer",
    category: "Web Development",
    difficulty: "Beginner",
    duration: "65 hours",
    tags: ["web development", "javascript", "react", "node.js"],
    youtube_link: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
    udemy_link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    coursera_link: "https://www.coursera.org/specializations/web-design",
    geeksforgeeks_link: "",
    trending_score: 95
  },
  {
    id: 3,
    title: "Python for Data Science and Machine Learning",
    description: "Learn NumPy, Pandas, Scikit-Learn, Machine Learning",
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "25 hours",
    tags: ["python", "data science", "machine learning", "pandas"],
    youtube_link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    udemy_link: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    coursera_link: "",
    geeksforgeeks_link: "https://www.geeksforgeeks.org/courses/data-science-live",
    trending_score: 92
  },
  {
    id: 4,
    title: "Deep Learning Specialization",
    description: "Master Deep Learning and Break into AI",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "3 months",
    tags: ["deep learning", "neural networks", "tensorflow"],
    youtube_link: "https://www.youtube.com/watch?v=CS4cs9xVecg",
    udemy_link: "https://www.udemy.com/course/deeplearning/",
    coursera_link: "https://www.coursera.org/specializations/deep-learning",
    geeksforgeeks_link: "",
    trending_score: 96
  },
  {
    id: 5,
    title: "AWS Certified Solutions Architect",
    description: "Learn Amazon Web Services certification",
    category: "Cloud Computing",
    difficulty: "Intermediate",
    duration: "30 hours",
    tags: ["aws", "cloud computing", "devops"],
    youtube_link: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
    udemy_link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate/",
    coursera_link: "https://www.coursera.org/learn/aws-fundamentals-going-cloud-native",
    geeksforgeeks_link: "",
    trending_score: 89
  },
  {
    id: 6,
    title: "React - The Complete Guide 2025",
    description: "Dive in and learn React.js from scratch",
    category: "Frontend Development",
    difficulty: "Beginner",
    duration: "48 hours",
    tags: ["react", "javascript", "frontend", "web development"],
    youtube_link: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    udemy_link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    coursera_link: "https://www.coursera.org/learn/front-end-react",
    geeksforgeeks_link: "",
    trending_score: 94
  },
  {
    id: 7,
    title: "Natural Language Processing",
    description: "Break into NLP space and build AI chatbots",
    category: "NLP",
    difficulty: "Advanced",
    duration: "4 months",
    tags: ["nlp", "machine learning", "deep learning"],
    youtube_link: "https://www.youtube.com/watch?v=fNxaJsNG3-s",
    udemy_link: "https://www.udemy.com/course/nlp-natural-language-processing-with-python/",
    coursera_link: "https://www.coursera.org/specializations/natural-language-processing",
    geeksforgeeks_link: "",
    trending_score: 88
  },
  {
    id: 8,
    title: "Docker & Kubernetes: Complete Guide",
    description: "Build and deploy Docker applications",
    category: "DevOps",
    difficulty: "Intermediate",
    duration: "22 hours",
    tags: ["docker", "kubernetes", "devops", "containers"],
    youtube_link: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    udemy_link: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    coursera_link: "https://www.coursera.org/learn/google-kubernetes-engine",
    geeksforgeeks_link: "",
    trending_score: 87
  },
  {
    id: 9,
    title: "Blockchain and Cryptocurrency",
    description: "Learn Blockchain, Bitcoin, and Ethereum",
    category: "Blockchain",
    difficulty: "Intermediate",
    duration: "15 hours",
    tags: ["blockchain", "cryptocurrency", "bitcoin", "ethereum"],
    youtube_link: "https://www.youtube.com/watch?v=M576WGiDBdQ",
    udemy_link: "https://www.udemy.com/course/build-your-blockchain-az/",
    coursera_link: "https://www.coursera.org/specializations/blockchain",
    geeksforgeeks_link: "",
    trending_score: 85
  },
  {
    id: 10,
    title: "Django for Beginners",
    description: "Learn Python Django and build web applications",
    category: "Backend Development",
    difficulty: "Beginner",
    duration: "18 hours",
    tags: ["django", "python", "web development", "backend"],
    youtube_link: "https://www.youtube.com/watch?v=F5mRW0jo-U4",
    udemy_link: "https://www.udemy.com/course/python-django-the-practical-guide/",
    coursera_link: "",
    geeksforgeeks_link: "https://www.geeksforgeeks.org/django-tutorial/",
    trending_score: 83
  },
  {
    id: 11,
    title: "Computer Vision and Image Processing",
    description: "Master Computer Vision and OpenCV",
    category: "Computer Vision",
    difficulty: "Advanced",
    duration: "20 hours",
    tags: ["computer vision", "opencv", "image processing", "deep learning"],
    youtube_link: "https://www.youtube.com/watch?v=01sAkU_NvOY",
    udemy_link: "https://www.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/",
    coursera_link: "https://www.coursera.org/learn/convolutional-neural-networks",
    geeksforgeeks_link: "",
    trending_score: 86
  },
  {
    id: 12,
    title: "Cybersecurity Fundamentals",
    description: "Learn cybersecurity basics and ethical hacking",
    category: "Cybersecurity",
    difficulty: "Beginner",
    duration: "25 hours",
    tags: ["cybersecurity", "ethical hacking", "network security"],
    youtube_link: "https://www.youtube.com/watch?v=U_P23SqJaDc",
    udemy_link: "https://www.udemy.com/course/the-complete-cyber-security-course/",
    coursera_link: "https://www.coursera.org/specializations/cyber-security",
    geeksforgeeks_link: "",
    trending_score: 84
  },
  {
    id: 13,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms for interviews",
    category: "Algorithms",
    difficulty: "Intermediate",
    duration: "30 hours",
    tags: ["algorithms", "data structures", "python", "coding interview"],
    youtube_link: "https://www.youtube.com/watch?v=pkYVOmU3MgA",
    udemy_link: "https://www.udemy.com/course/data-structures-algorithms-python/",
    coursera_link: "",
    geeksforgeeks_link: "https://www.geeksforgeeks.org/courses/dsa-self-paced",
    trending_score: 91
  },
  {
    id: 14,
    title: "Flutter & Dart Mobile Development",
    description: "Learn Flutter and build iOS and Android apps",
    category: "Mobile Development",
    difficulty: "Beginner",
    duration: "32 hours",
    tags: ["flutter", "dart", "mobile development", "cross-platform"],
    youtube_link: "https://www.youtube.com/watch?v=VPvVD8t02U8",
    udemy_link: "https://www.udemy.com/course/flutter-bootcamp-with-dart/",
    coursera_link: "https://www.coursera.org/learn/flutter-development",
    geeksforgeeks_link: "",
    trending_score: 82
  },
  {
    id: 15,
    title: "AI: Reinforcement Learning",
    description: "Complete guide to Reinforcement Learning",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    duration: "16 hours",
    tags: ["reinforcement learning", "artificial intelligence", "deep learning"],
    youtube_link: "https://www.youtube.com/watch?v=2pWv7GOvuf0",
    udemy_link: "https://www.udemy.com/course/artificial-intelligence-reinforcement-learning-in-python/",
    coursera_link: "https://www.coursera.org/specializations/reinforcement-learning",
    geeksforgeeks_link: "",
    trending_score: 80
  },
  {
    id: 16,
    title: "SQL for Data Analysis",
    description: "Master SQL for data analysis",
    category: "Database",
    difficulty: "Beginner",
    duration: "12 hours",
    tags: ["sql", "database", "data analysis"],
    youtube_link: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    udemy_link: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    coursera_link: "https://www.coursera.org/learn/sql-for-data-science",
    geeksforgeeks_link: "",
    trending_score: 79
  },
  {
    id: 17,
    title: "Tableau for Data Visualization",
    description: "Master Tableau for business intelligence",
    category: "Data Visualization",
    difficulty: "Beginner",
    duration: "10 hours",
    tags: ["tableau", "data visualization", "dashboards"],
    youtube_link: "https://www.youtube.com/watch?v=aHaOIvR00So",
    udemy_link: "https://www.udemy.com/course/tableau10/",
    coursera_link: "https://www.coursera.org/learn/analytics-tableau",
    geeksforgeeks_link: "",
    trending_score: 77
  },
  {
    id: 18,
    title: "Git and GitHub Masterclass",
    description: "Master Git version control and GitHub",
    category: "Developer Tools",
    difficulty: "Beginner",
    duration: "8 hours",
    tags: ["git", "github", "version control"],
    youtube_link: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    udemy_link: "https://www.udemy.com/course/git-complete/",
    coursera_link: "",
    geeksforgeeks_link: "https://www.geeksforgeeks.org/git-tutorial/",
    trending_score: 76
  },
  {
    id: 19,
    title: "Spring Boot Microservices",
    description: "Build microservices with Spring Boot",
    category: "Backend Development",
    difficulty: "Advanced",
    duration: "28 hours",
    tags: ["spring boot", "java", "microservices", "rest api"],
    youtube_link: "https://www.youtube.com/watch?v=BnknNTN8icw",
    udemy_link: "https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/",
    coursera_link: "https://www.coursera.org/learn/cloud-native-java-spring",
    geeksforgeeks_link: "",
    trending_score: 81
  },
  {
    "id": 20,
    "title": "Generative AI with ChatGPT and LLMs",
    "description": "Master generative AI and prompt engineering with large language models like GPT.",
    "category": "Generative AI",
    "difficulty": "Intermediate",
    "duration": "14 hours",
    "tags": ["generative ai", "chatgpt", "llm", "prompt engineering"],
    "youtube_link": "https://www.youtube.com/watch?v=mEsleV16qdo",
    "udemy_link": "https://www.udemy.com/course/chatgpt-complete-guide/",
    "coursera_link": "https://www.coursera.org/learn/generative-ai-with-llms",
    "geeksforgeeks_link": "",
    "trending_score": 99
  },
  {
    "id": 21,
    "title": "Angular - The Complete Guide",
    "description": "Learn Angular development from scratch and build advanced single page applications.",
    "category": "Frontend Development",
    "difficulty": "Intermediate",
    "duration": "35 hours",
    "tags": ["angular", "typescript", "frontend", "javascript"],
    "youtube_link": "https://www.youtube.com/watch?v=2OHbjep_WjQ",
    "udemy_link": "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
    "coursera_link": "",
    "geeksforgeeks_link": "",
    "trending_score": 80
  },
  {
    "id": 22,
    "title": "Kubernetes (K8s) Masterclass",
    "description": "Become proficient in Kubernetes orchestration and container management.",
    "category": "DevOps",
    "difficulty": "Advanced",
    "duration": "25 hours",
    "tags": ["kubernetes", "containers", "devops", "docker"],
    "youtube_link": "https://www.youtube.com/watch?v=X48VuDVv0do",
    "udemy_link": "https://www.udemy.com/course/learn-kubernetes/",
    "coursera_link": "",
    "geeksforgeeks_link": "",
    "trending_score": 78
  },
  {
    "id": 23,
    "title": "Ethical Hacking Beginner to Advanced",
    "description": "Learn penetration testing and securing networks ethically.",
    "category": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "40 hours",
    "tags": ["ethical hacking", "penetration testing", "cybersecurity"],
    "youtube_link": "https://www.youtube.com/watch?v=1NUq3hK1t6w",
    "udemy_link": "https://www.udemy.com/course/learn-ethical-hacking-from-scratch/",
    "coursera_link": "",
    "geeksforgeeks_link": "",
    "trending_score": 76
  },
  {
    "id": 24,
    "title": "Java Programming Masterclass",
    "description": "Comprehensive Java programming from basics to advanced topics.",
    "category": "Programming",
    "difficulty": "Beginner",
    "duration": "45 hours",
    "tags": ["java", "programming", "object-oriented"],
    "youtube_link": "https://www.youtube.com/watch?v=grEKMHGYyns",
    "udemy_link": "https://www.udemy.com/course/java-the-complete-java-developer-course/",
    "coursera_link": "",
    "geeksforgeeks_link": "",
    "trending_score": 75
  },
  {
    "id": 25,
    "title": "Vue.js - The Complete Guide",
    "description": "Learn Vue.js framework and ecosystem for building scalable frontends.",
    "category": "Frontend Development",
    "difficulty": "Intermediate",
    "duration": "30 hours",
    "tags": ["vue.js", "javascript", "frontend"],
    "youtube_link": "https://www.youtube.com/watch?v=Wy9q22isx3U",
    "udemy_link": "https://www.udemy.com/course/vuejs-2-the-complete-guide/",
    "coursera_link": "",
    "geeksforgeeks_link": "",
    "trending_score": 74
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Course.deleteMany({});
    console.log('Cleared old courses');

    await Course.insertMany(coursesData);
    console.log(`✅ Inserted ${coursesData.length} courses`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();
