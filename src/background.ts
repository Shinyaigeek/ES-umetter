chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    console.log(req);
    if (req.contentScriptQuery === "addTemplate") {
        chrome.storage.sync.get(["esUmetterStore"], (result) => {
            const arr = result?.esUmetterStore;
            if (!arr) {
                chrome.storage.sync.set(
                    {
                        esUmetterStore: JSON.stringify([
                            {
                                label: req.label,
                                value: req.value,
                            },
                        ]),
                    },
                    () => {
                        console.log("success!! esUmetterStore successfully stored!!");
                    }
                );
            } else {
                const parsed = JSON.parse(arr);
                if (Array.isArray(parsed) || parsed.length > 0) {
                    parsed.push({
                        label: req.label,
                        value: req.value,
                    });
                    chrome.storage.sync.set(
                        {
                            esUmetterStore: JSON.stringify(parsed),
                        },
                        () => {
                            console.log("success!! esUmetterStore successfully stored!!");
                        }
                    );
                } else {
                    chrome.storage.sync.set(
                        {
                            esUmetterStore: JSON.stringify([
                                {
                                    label: req.label,
                                    value: req.value,
                                },
                            ]),
                        },
                        () => {
                            console.log("success!! esUmetterStore successfully stored!!");
                        }
                    );
                }
            }
        });
    } else if (req.contentScriptQuery === "getTemplates") {
        chrome.storage.sync.get(["esUmetterStore"], (result) => {
            const arr = result?.esUmetterStore;
            if (!arr) {
                sendRes([]);
            }
            const parsed = JSON.parse(arr);
            if (!Array.isArray(parsed)) {
                sendRes([]);
            }
            sendRes(parsed);
        });
    }

    return true
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "esUmetterStore": JSON.stringify([])
    })
})
