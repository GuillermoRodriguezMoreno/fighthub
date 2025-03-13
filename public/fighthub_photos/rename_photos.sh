#!/bin/bash

# Verify parameters
if [ "$#" -ne 2 ]; then
    echo "Use: $0 <path> <name>"
    exit 1
fi

# Path
DIRECTORY="$1"

#Name
NAME="$2"

# Verify directory
if [ ! -d "$DIRECTORY" ]; then
    echo "Not found"
    exit 1
fi

# Count
count=1

# Iterate over files
for file in "$DIRECTORY"/*; do
    # Verify file
    if [ -f "$file" ]; then
        # New name
        new_name="$NAME$count.jpg"
        
        # Rename
        mv "$file" "$DIRECTORY/$new_name"
        
        # Increment
        count=$((count + 1))
    fi
done

echo "Rename completed."

