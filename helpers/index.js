import { supabase } from "@/config/index";

export const problems = [
    {
        icon: "fas fa-user-clock fa-3x",
        title: "Inefficiency",
        description:
            "Manual Screening is Time Consuming and it leads to Inefficient Results",
    },
    {
        icon: "fas fa-edit fa-3x",
        title: "Inaccuracy",
        description:
            "Less Time spent per Resume means that the key aspects of candidates are missed out.",
    },
    {
        icon: "fas fa-user-secret fa-3x",
        title: "Security",
        description:
            "Personal Data is out in the open and is vulnerable to data theft and other privacy issues",
        end: true,
    },
];

export const solutions = [
    {
        image: "speed.jpg",
        title: "Speed",
        description:
            "Our systems are capable of parsing 100 Resumes in less than 2 minutes. We can handle documents in different file formats without breaking a sweat!",
    },
    {
        image: "accuracy.jpg",
        reverse: true,
        title: "Accurate Results",
        description:
            "Our algorithm is trained with loads of random data to ensure that it provides the most accurate numbers and predictions for your candidates. We ensure we provide you enough data to fairly judge each candidate.",
    },
    // {
    //     image: "visualizations.jpg",
    //     title: "Visualizations",
    //     description:
    //         "We provide quality data visualizations in the form of graphs and charts to give provide you clarity about the experience of candidates in your preferred and required skillsets.",
    // },
];

export const arrayMatchCount = (query, list) => {
    let count = 0;

    for (var j = 0; j < list.length; j++) {
        if (list[j].match(query)) {
            count += 1;
        }
    }

    return count;
};

export function exportJson(obj) {
    var data =
        "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.click();
    link.setAttribute("href", "data:" + data);
    link.setAttribute("download", "data.json");
}

export const downloadURL = (filename) => {
    let { signedURL, error } = supabase.storage
        .from("files")
        .getPublicUrl(`files/${filename}`);

    return signedURL;
};
