import tkinter as tk
from datetime import datetime, timedelta

# total seconds = 14,688,000 (170 days)
target_duration = timedelta(seconds=14688000)
end_time = datetime.now() + target_duration

def update_timer():
    remaining = end_time - datetime.now()
    if remaining.total_seconds() <= 0:
        label.config(text="Countdown finished!")
    else:
        days = remaining.days
        hours, remainder = divmod(remaining.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        label.config(text=f"{days:03d}d {hours:02d}h {minutes:02d}m {seconds:02d}s")
        root.after(1000, update_timer)  # update every second

# Create window
root = tk.Tk()
root.title("Countdown Timer")

label = tk.Label(root, font=("Helvetica", 32), fg="blue")
label.pack(padx=20, pady=20)

update_timer()
root.mainloop()
