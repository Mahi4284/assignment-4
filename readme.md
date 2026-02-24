1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

        ID → single
        Class → multiple (live)
        querySelector → first match
        querySelectorAll → all matches



2. How do you create and insert a new element into the DOM?

        >>> createElement()
        >>> Content / attribute সেট
        >>> appendChild() / prepend() দিয়ে insert




3. What is Event Bubbling? And how does it work?

        Event নিচ থেকে উপরে যায় = Bubbling





4. What is Event Delegation in JavaScript? Why is it useful?

        Parent এ listener → Child handle
            Efficient
            Works for dynamic elements




5. What is the difference between preventDefault() and stopPropagation() methods?

        Default action block করে
        Event parent-এ না যায়