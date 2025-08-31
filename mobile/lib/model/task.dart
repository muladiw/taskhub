class Task {
  final String id;
  final String title;
  final String status;

  Task({required this.id, required this.title, required this.status});

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(id: json['id'], title: json['title'], status: json['status']);
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'title': title, 'status': status};
  }

  Task copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    DateTime? createdAt,
    String? status,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      status: status ?? this.status,
    );
  }
}
