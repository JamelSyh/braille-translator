from ahocorasick import Automaton


def search_braille_patterns(text, patterns):
    # Create an Automaton object
    automaton = Automaton()

    # Add patterns to the Automaton
    for pattern,  value in patterns.items():
        automaton.add_word(pattern, (pattern, value))

    # Build the Automaton
    automaton.make_automaton()

    # Search for patterns in the text
    results = []
    for end_index, (pattern, value) in automaton.iter(text):
        start_index = end_index - len(pattern) + 1
        results.append((start_index, end_index, value))

    # Sort the results by pattern length in descending order
    results.sort(key=lambda x: len(x[2]), reverse=True)

    # Filter out overlapping patterns and keep only the largest pattern
    filtered_results = []
    for result in results:
        start_index, end_index, pattern = result
        is_overlap = False
        for filtered_result in filtered_results:
            filtered_start_index, filtered_end_index, _ = filtered_result
            if start_index <= filtered_end_index and end_index >= filtered_start_index:
                is_overlap = True
                break
        if not is_overlap:
            filtered_results.append(result)

    return filtered_results
