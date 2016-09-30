from django.db import models
from django.db.models import *

from keops.api import decorators as api


class DecimalField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('max_digits', 18)
        kwargs.setdefault('decimal_places', 2)
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(DecimalField, self).__init__(*args, **kwargs)


class FloatField(models.FloatField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(FloatField, self).__init__(*args, **kwargs)


class CharField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('max_length', 128)
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(CharField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if isinstance(value, models.CharField):
            return value
        if value == None:
            return ""
        else:
            return value

    def get_db_prep_value(self, value, connection, prepared=False):
        if not value:
            return None
        else:
            return value


class DateField(models.DateField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(DateField, self).__init__(*args, **kwargs)


class DateTimeField(models.DateTimeField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(DateTimeField, self).__init__(*args, **kwargs)


class SmallIntegerField(models.SmallIntegerField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(SmallIntegerField, self).__init__(*args, **kwargs)


class IntegerField(models.IntegerField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(IntegerField, self).__init__(*args, **kwargs)


class ImageField(models.ImageField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(ImageField, self).__init__(*args, **kwargs)


class ForeignKey(models.ForeignKey):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(ForeignKey, self).__init__(*args, **kwargs)


class TextField(models.TextField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', True)
        kwargs.setdefault('blank', kwargs['null'])
        super(TextField, self).__init__(*args, **kwargs)


class BaseModel(models.Model):
    def to_dict(self):
        return {f.name: self.serializable_value(f.name) for f in self.__class__._meta.fields}

    @api.method
    def get(cls, id, **kwargs):
        return {'data': cls._default_manager.get(pk=id).to_dict()}

    def serializable_value(self, field_name):
        try:
            field = self._meta.get_field(field_name)
            if isinstance(field, ImageField):
                v = getattr(self, field_name)
                if v:
                    return v.name
                else:
                    return
        except FieldDoesNotExist:
            return getattr(self, field_name)
        return getattr(self, field.attname)

    def deserialize_value(self, field_name, value):
        field = self._meta.get_field(field_name)
        if isinstance(field, models.ForeignKey):
            field_name = field.attname
        setattr(self, field_name, value)

    def set(self, *args, **kwargs):
        if args and isinstance(args[0], dict):
            data = args[0]
            data.update(kwargs)
        else:
            data = kwargs
        data.pop('id', None)
        for k, v in data.items():
            self.deserialize_value(k, v)
        if self.pk:
            self.save(update_fields=data.keys())
        else:
            self.save()

    @api.method
    def write(cls, data=None, **kwargs):
        for row in data:
            pk = row['id']
            values = row['values']
            obj = cls._default_manager.get(pk=pk)
            obj.set(values)
        return {'success': True}

    @api.method
    def search(cls, where=None, **kwargs):
        if where is None:
            qs = cls._default_manager.all()
        else:
            qs = cls._default_manager.filter(**where)
        return {'data': [obj.to_dict() for obj in qs]}

    @api.method
    def get_view_info(cls, view_type='form'):
        pass

    @api.method
    def get_fields_info(cls, view_type):
        pass

    class Meta:
        abstract = True
